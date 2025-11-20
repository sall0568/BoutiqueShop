import prisma from '../../config/database';

export class DashboardService {
  async getOverview(storeId: string, startDate?: string, endDate?: string) {
    const dateFilter: any = {};
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) dateFilter.createdAt.gte = new Date(startDate);
      if (endDate) dateFilter.createdAt.lte = new Date(endDate);
    }

    const [salesStats, expensesStats, productsCount, lowStockCount, todaySales] = await Promise.all([
      // Sales stats
      prisma.sale.aggregate({
        where: { storeId, ...dateFilter },
        _sum: { finalAmount: true },
        _count: true,
      }),

      // Expenses stats
      prisma.expense.aggregate({
        where: { storeId, date: dateFilter.createdAt || {} },
        _sum: { amount: true },
        _count: true,
      }),

      // Total products
      prisma.product.count({
        where: { storeId, isActive: true },
      }),

      // Low stock count
      prisma.product.count({
        where: {
          storeId,
          isActive: true,
          quantity: { lte: prisma.product.fields.minQuantity },
        },
      }),

      // Today's sales
      prisma.sale.aggregate({
        where: {
          storeId,
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
        _sum: { finalAmount: true },
        _count: true,
      }),
    ]);

    const totalRevenue = salesStats._sum.finalAmount || 0;
    const totalExpenses = expensesStats._sum.amount || 0;
    const netProfit = totalRevenue - totalExpenses;

    return {
      revenue: {
        total: totalRevenue,
        count: salesStats._count,
      },
      expenses: {
        total: totalExpenses,
        count: expensesStats._count,
      },
      netProfit,
      products: {
        total: productsCount,
        lowStock: lowStockCount,
      },
      today: {
        revenue: todaySales._sum.finalAmount || 0,
        salesCount: todaySales._count,
      },
    };
  }

  async getSalesChart(storeId: string, days: number = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const sales = await prisma.sale.findMany({
      where: {
        storeId,
        createdAt: { gte: startDate },
      },
      select: {
        finalAmount: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    // Group by date
    const salesByDate: { [key: string]: number } = {};
    sales.forEach((sale) => {
      const date = sale.createdAt.toISOString().split('T')[0];
      salesByDate[date] = (salesByDate[date] || 0) + sale.finalAmount;
    });

    return Object.entries(salesByDate).map(([date, amount]) => ({
      date,
      amount,
    }));
  }

  async getTopProducts(storeId: string, limit: number = 10) {
    const topProducts = await prisma.saleItem.groupBy({
      by: ['productId'],
      where: {
        sale: { storeId },
      },
      _sum: {
        quantity: true,
        subtotal: true,
      },
      orderBy: {
        _sum: {
          subtotal: 'desc',
        },
      },
      take: limit,
    });

    const productsWithDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          select: {
            id: true,
            name: true,
            sku: true,
            price: true,
          },
        });

        return {
          product,
          totalQuantity: item._sum.quantity || 0,
          totalRevenue: item._sum.subtotal || 0,
        };
      })
    );

    return productsWithDetails;
  }

  async getRecentActivities(storeId: string, limit: number = 10) {
    const [recentSales, recentExpenses, recentStockMovements] = await Promise.all([
      prisma.sale.findMany({
        where: { storeId },
        select: {
          id: true,
          saleNumber: true,
          finalAmount: true,
          createdAt: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),

      prisma.expense.findMany({
        where: { storeId },
        select: {
          id: true,
          description: true,
          amount: true,
          category: true,
          createdAt: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),

      prisma.stockMovement.findMany({
        where: {
          product: { storeId },
        },
        select: {
          id: true,
          type: true,
          quantity: true,
          reason: true,
          createdAt: true,
          product: {
            select: {
              name: true,
            },
          },
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

    const activities = [
      ...recentSales.map((s) => ({
        type: 'sale',
        id: s.id,
        description: `Vente ${s.saleNumber}`,
        amount: s.finalAmount,
        user: `${s.user.firstName} ${s.user.lastName}`,
        createdAt: s.createdAt,
      })),
      ...recentExpenses.map((e) => ({
        type: 'expense',
        id: e.id,
        description: e.description,
        amount: -e.amount,
        category: e.category,
        user: `${e.user.firstName} ${e.user.lastName}`,
        createdAt: e.createdAt,
      })),
      ...recentStockMovements.map((m) => ({
        type: 'stock',
        id: m.id,
        description: `${m.type} - ${m.product.name}`,
        quantity: m.quantity,
        reason: m.reason,
        user: `${m.user.firstName} ${m.user.lastName}`,
        createdAt: m.createdAt,
      })),
    ];

    return activities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit);
  }
}
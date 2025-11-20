import prisma from '../../config/database';
import { AppError } from '../../middlewares/error.middleware';
import { StockMovementType } from '@prisma/client';

export class SalesService {
  async getAll(
    storeId: string,
    filters?: {
      startDate?: string;
      endDate?: string;
      paymentMethod?: string;
    }
  ) {
    const where: any = { storeId };

    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {};
      if (filters.startDate) {
        where.createdAt.gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        where.createdAt.lte = new Date(filters.endDate);
      }
    }

    if (filters?.paymentMethod) {
      where.paymentMethod = filters.paymentMethod;
    }

    return prisma.sale.findMany({
      where,
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                sku: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id: string, storeId: string) {
    const sale = await prisma.sale.findFirst({
      where: { id, storeId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!sale) {
      throw new AppError('Vente non trouvée', 404);
    }

    return sale;
  }

  async create(
    data: {
      items: Array<{
        productId: string;
        quantity: number;
        unitPrice: number;
        discount?: number;
      }>;
      discount?: number;
      tax?: number;
      paymentMethod?: string;
      customerName?: string;
      customerPhone?: string;
      notes?: string;
    },
    userId: string,
    storeId: string
  ) {
    // Verify all products exist and have sufficient stock
    for (const item of data.items) {
      const product = await prisma.product.findFirst({
        where: { id: item.productId, storeId },
      });

      if (!product) {
        throw new AppError(`Produit ${item.productId} non trouvé`, 404);
      }

      if (!product.isActive) {
        throw new AppError(`Produit ${product.name} est inactif`, 400);
      }

      if (product.quantity < item.quantity) {
        throw new AppError(`Stock insuffisant pour ${product.name}. Disponible: ${product.quantity}`, 400);
      }
    }

    // Calculate totals
    let totalAmount = 0;
    const saleItems = data.items.map((item) => {
      const discount = item.discount || 0;
      const subtotal = item.quantity * item.unitPrice - discount;
      totalAmount += subtotal;
      return {
        ...item,
        discount,
        subtotal,
      };
    });

    const discount = data.discount || 0;
    const tax = data.tax || 0;
    const finalAmount = totalAmount - discount + tax;

    // Generate sale number
    const saleNumber = `VT-${Date.now()}`;

    // Create sale with items and update stock
    const sale = await prisma.$transaction(async (tx) => {
      const newSale = await tx.sale.create({
        data: {
          saleNumber,
          totalAmount,
          discount,
          tax,
          finalAmount,
          paymentMethod: data.paymentMethod || 'CASH',
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          notes: data.notes,
          userId,
          storeId,
          items: {
            create: saleItems,
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      // Update stock and create stock movements
      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });

        await tx.stockMovement.create({
          data: {
            type: StockMovementType.OUT,
            quantity: item.quantity,
            reason: `Vente ${saleNumber}`,
            productId: item.productId,
            userId,
          },
        });
      }

      return newSale;
    });

    return sale;
  }

  async delete(id: string, storeId: string, userId: string) {
    const sale = await this.getById(id, storeId);

    // Restore stock
    await prisma.$transaction(async (tx) => {
      for (const item of sale.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            quantity: {
              increment: item.quantity,
            },
          },
        });

        await tx.stockMovement.create({
          data: {
            type: StockMovementType.IN,
            quantity: item.quantity,
            reason: `Annulation vente ${sale.saleNumber}`,
            productId: item.productId,
            userId,
          },
        });
      }

      await tx.sale.delete({
        where: { id },
      });
    });
  }

  async getStats(storeId: string, startDate?: string, endDate?: string) {
    const where: any = { storeId };

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    const [totalSales, totalRevenue, salesByPaymentMethod] = await Promise.all([
      prisma.sale.count({ where }),
      prisma.sale.aggregate({
        where,
        _sum: {
          finalAmount: true,
        },
      }),
      prisma.sale.groupBy({
        by: ['paymentMethod'],
        where,
        _count: true,
        _sum: {
          finalAmount: true,
        },
      }),
    ]);

    return {
      totalSales,
      totalRevenue: totalRevenue._sum.finalAmount || 0,
      salesByPaymentMethod,
    };
  }
}
import prisma from '../../config/database';
import { AppError } from '../../middlewares/error.middleware';

export class ExpensesService {
  async getAll(
    storeId: string,
    filters?: {
      startDate?: string;
      endDate?: string;
      category?: string;
    }
  ) {
    const where: any = { storeId };

    if (filters?.startDate || filters?.endDate) {
      where.date = {};
      if (filters.startDate) {
        where.date.gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        where.date.lte = new Date(filters.endDate);
      }
    }

    if (filters?.category) {
      where.category = filters.category;
    }

    return prisma.expense.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });
  }

  async getById(id: string, storeId: string) {
    const expense = await prisma.expense.findFirst({
      where: { id, storeId },
      include: {
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

    if (!expense) {
      throw new AppError('Dépense non trouvée', 404);
    }

    return expense;
  }

  async create(
    data: {
      description: string;
      amount: number;
      category: string;
      date?: string;
    },
    userId: string,
    storeId: string
  ) {
    return prisma.expense.create({
      data: {
        description: data.description,
        amount: data.amount,
        category: data.category,
        date: data.date ? new Date(data.date) : new Date(),
        userId,
        storeId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async update(
    id: string,
    data: {
      description?: string;
      amount?: number;
      category?: string;
      date?: string;
    },
    storeId: string
  ) {
    await this.getById(id, storeId);

    const updateData: any = {};
    if (data.description) updateData.description = data.description;
    if (data.amount) updateData.amount = data.amount;
    if (data.category) updateData.category = data.category;
    if (data.date) updateData.date = new Date(data.date);

    return prisma.expense.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async delete(id: string, storeId: string) {
    await this.getById(id, storeId);

    return prisma.expense.delete({
      where: { id },
    });
  }

  async getStats(storeId: string, startDate?: string, endDate?: string) {
    const where: any = { storeId };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) {
        where.date.gte = new Date(startDate);
      }
      if (endDate) {
        where.date.lte = new Date(endDate);
      }
    }

    const [totalExpenses, expensesByCategory] = await Promise.all([
      prisma.expense.aggregate({
        where,
        _sum: {
          amount: true,
        },
        _count: true,
      }),
      prisma.expense.groupBy({
        by: ['category'],
        where,
        _sum: {
          amount: true,
        },
        _count: true,
      }),
    ]);

    return {
      totalExpenses: totalExpenses._sum.amount || 0,
      count: totalExpenses._count,
      expensesByCategory,
    };
  }

  async getCategories(storeId: string) {
    const categories = await prisma.expense.findMany({
      where: { storeId },
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    });

    return categories.map((c) => c.category);
  }
}
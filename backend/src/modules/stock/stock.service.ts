import prisma from '../../config/database';
import { AppError } from '../../middlewares/error.middleware';
import { StockMovementType } from '@prisma/client';

export class StockService {
  async getMovements(
    storeId: string,
    filters?: {
      productId?: string;
      type?: StockMovementType;
      startDate?: string;
      endDate?: string;
    }
  ) {
    const where: any = {
      product: {
        storeId,
      },
    };

    if (filters?.productId) {
      where.productId = filters.productId;
    }

    if (filters?.type) {
      where.type = filters.type;
    }

    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {};
      if (filters.startDate) {
        where.createdAt.gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        where.createdAt.lte = new Date(filters.endDate);
      }
    }

    return prisma.stockMovement.findMany({
      where,
      include: {
        product: {
          select: {
            id: true,
            name: true,
            sku: true,
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

  async createMovement(
    data: {
      type: StockMovementType;
      quantity: number;
      reason?: string;
      productId: string;
    },
    userId: string,
    storeId: string
  ) {
    const product = await prisma.product.findFirst({
      where: { id: data.productId, storeId },
    });

    if (!product) {
      throw new AppError('Produit non trouvé', 404);
    }

    // Check if OUT movement would result in negative stock
    if (data.type === StockMovementType.OUT && product.quantity < data.quantity) {
      throw new AppError('Stock insuffisant', 400);
    }

    return prisma.$transaction(async (tx) => {
      // Create movement
      const movement = await tx.stockMovement.create({
        data: {
          type: data.type,
          quantity: data.quantity,
          reason: data.reason,
          productId: data.productId,
          userId,
        },
        include: {
          product: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      // Update product quantity
      const quantityChange =
        data.type === StockMovementType.IN
          ? data.quantity
          : data.type === StockMovementType.OUT
          ? -data.quantity
          : 0;

      if (data.type === StockMovementType.ADJUSTMENT) {
        await tx.product.update({
          where: { id: data.productId },
          data: {
            quantity: data.quantity,
          },
        });
      } else {
        await tx.product.update({
          where: { id: data.productId },
          data: {
            quantity: {
              increment: quantityChange,
            },
          },
        });
      }

      return movement;
    });
  }

  async getStockValue(storeId: string) {
    const products = await prisma.product.findMany({
      where: { storeId, isActive: true },
      select: {
        quantity: true,
        cost: true,
        price: true,
      },
    });

    const totalCostValue = products.reduce((sum, p) => sum + p.quantity * p.cost, 0);
    const totalRetailValue = products.reduce((sum, p) => sum + p.quantity * p.price, 0);
    const totalProducts = products.length;
    const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);

    return {
      totalCostValue,
      totalRetailValue,
      potentialProfit: totalRetailValue - totalCostValue,
      totalProducts,
      totalItems,
    };
  }

  async getStockAlerts(storeId: string) {
    const lowStock = await prisma.product.findMany({
      where: {
        storeId,
        isActive: true,
        quantity: {
          lte: prisma.product.fields.minQuantity,
        },
      },
      include: {
        category: true,
      },
      orderBy: { quantity: 'asc' },
    });

    const outOfStock = lowStock.filter((p) => p.quantity === 0);
    const criticalStock = lowStock.filter((p) => p.quantity > 0 && p.quantity <= p.minQuantity);

    return {
      outOfStock,
      criticalStock,
      total: lowStock.length,
    };
  }
}
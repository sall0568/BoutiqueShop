import prisma from '../../config/database';
import { AppError } from '../../middlewares/error.middleware';

export class ProductsService {
  async getAll(
    storeId: string,
    filters?: {
      search?: string;
      categoryId?: string;
      isActive?: boolean;
      lowStock?: boolean;
    }
  ) {
    const where: any = { storeId };

    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { sku: { contains: filters.search, mode: 'insensitive' } },
        { barcode: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters?.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters?.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (filters?.lowStock) {
      return products.filter((p) => p.quantity <= p.minQuantity);
    }

    return products;
  }

  async getById(id: string, storeId: string) {
    const product = await prisma.product.findFirst({
      where: { id, storeId },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw new AppError('Produit non trouvé', 404);
    }

    return product;
  }

  async create(
    data: {
      name: string;
      description?: string;
      sku?: string;
      barcode?: string;
      price: number;
      cost?: number;
      quantity?: number;
      minQuantity?: number;
      unit?: string;
      categoryId?: string;
    },
    storeId: string
  ) {
    if (data.categoryId) {
      const category = await prisma.category.findFirst({
        where: { id: data.categoryId, storeId },
      });

      if (!category) {
        throw new AppError('Catégorie non trouvée', 404);
      }
    }

    return prisma.product.create({
      data: {
        ...data,
        storeId,
      },
      include: {
        category: true,
      },
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      description?: string;
      sku?: string;
      barcode?: string;
      price?: number;
      cost?: number;
      quantity?: number;
      minQuantity?: number;
      unit?: string;
      categoryId?: string;
      isActive?: boolean;
    },
    storeId: string
  ) {
    await this.getById(id, storeId);

    if (data.categoryId) {
      const category = await prisma.category.findFirst({
        where: { id: data.categoryId, storeId },
      });

      if (!category) {
        throw new AppError('Catégorie non trouvée', 404);
      }
    }

    return prisma.product.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });
  }

  async delete(id: string, storeId: string) {
    await this.getById(id, storeId);

    return prisma.product.delete({
      where: { id },
    });
  }

  async getLowStock(storeId: string) {
    return prisma.product.findMany({
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
  }
}
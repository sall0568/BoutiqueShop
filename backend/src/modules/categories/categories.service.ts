import prisma from '../../config/database';
import { AppError } from '../../middlewares/error.middleware';

export class CategoriesService {
  async getAll(storeId: string) {
    return prisma.category.findMany({
      where: { storeId },
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async getById(id: string, storeId: string) {
    const category = await prisma.category.findFirst({
      where: { id, storeId },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      throw new AppError('Catégorie non trouvée', 404);
    }

    return category;
  }

  async create(data: { name: string; description?: string }, storeId: string) {
    return prisma.category.create({
      data: {
        ...data,
        storeId,
      },
    });
  }

  async update(id: string, data: { name?: string; description?: string }, storeId: string) {
    await this.getById(id, storeId);

    return prisma.category.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, storeId: string) {
    const category = await this.getById(id, storeId);

    if (category._count.products > 0) {
      throw new AppError('Impossible de supprimer une catégorie contenant des produits', 400);
    }

    return prisma.category.delete({
      where: { id },
    });
  }
}
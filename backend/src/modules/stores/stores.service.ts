import prisma from '../../config/database';
import { AppError } from '../../middlewares/error.middleware';

export class StoresService {
  async getById(id: string) {
    const store = await prisma.store.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            users: true,
            products: true,
            sales: true,
          },
        },
      },
    });

    if (!store) {
      throw new AppError('Boutique non trouvée', 404);
    }

    return store;
  }

  async update(
    id: string,
    data: {
      name?: string;
      address?: string;
      phone?: string;
      email?: string;
      currency?: string;
      taxRate?: number;
    }
  ) {
    const store = await prisma.store.findUnique({
      where: { id },
    });

    if (!store) {
      throw new AppError('Boutique non trouvée', 404);
    }

    return prisma.store.update({
      where: { id },
      data,
    });
  }
}
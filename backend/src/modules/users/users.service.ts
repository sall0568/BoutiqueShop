import prisma from '../../config/database';
import { PasswordUtil } from '../../utils/password.util';
import { AppError } from '../../middlewares/error.middleware';
import { UserRole } from '@prisma/client';

export class UsersService {
  async getAll(storeId: string) {
    return prisma.user.findMany({
      where: { storeId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id: string, storeId: string) {
    const user = await prisma.user.findFirst({
      where: { id, storeId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new AppError('Utilisateur non trouvé', 404);
    }

    return user;
  }

  async create(
    data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phone?: string;
      role?: UserRole;
    },
    storeId: string
  ) {
    const hashedPassword = await PasswordUtil.hash(data.password);

    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        storeId,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async update(
    id: string,
    data: {
      email?: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
      role?: UserRole;
      isActive?: boolean;
    },
    storeId: string
  ) {
    await this.getById(id, storeId);

    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async delete(id: string, storeId: string) {
    await this.getById(id, storeId);

    return prisma.user.delete({
      where: { id },
    });
  }
}
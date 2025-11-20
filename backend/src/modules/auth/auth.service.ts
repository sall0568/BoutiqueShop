import prisma from '../../config/database';
import { PasswordUtil } from '../../utils/password.util';
import { JWTUtil } from '../../utils/jwt.util';
import { AppError } from '../../middlewares/error.middleware';
import { UserRole } from '@prisma/client';

export class AuthService {
  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    storeName: string;
  }) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError('Un utilisateur avec cet email existe déjà', 409);
    }

    const hashedPassword = await PasswordUtil.hash(data.password);

    const store = await prisma.store.create({
      data: {
        name: data.storeName,
      },
    });

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: UserRole.ADMIN,
        storeId: store.id,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        storeId: true,
        createdAt: true,
      },
    });

    const token = JWTUtil.sign({
      userId: user.id,
      email: user.email,
      role: user.role,
      storeId: user.storeId,
    });

    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Email ou mot de passe incorrect', 401);
    }

    if (!user.isActive) {
      throw new AppError('Ce compte est désactivé', 403);
    }

    const isPasswordValid = await PasswordUtil.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Email ou mot de passe incorrect', 401);
    }

    const token = JWTUtil.sign({
      userId: user.id,
      email: user.email,
      role: user.role,
      storeId: user.storeId,
    });

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  async getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        storeId: true,
        isActive: true,
        store: {
          select: {
            id: true,
            name: true,
            currency: true,
          },
        },
        createdAt: true,
      },
    });

    if (!user) {
      throw new AppError('Utilisateur non trouvé', 404);
    }

    return user;
  }
}
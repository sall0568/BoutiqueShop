import { Request, Response, NextFunction } from 'express';
import { JWTUtil } from '../utils/jwt.util';
import { AppError } from './error.middleware';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = JWTUtil.verify(token);

    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role as any,
      storeId: decoded.storeId,
    };

    next();
  } catch (error) {
    next(new AppError('Invalid or expired token', 401));
  }
};
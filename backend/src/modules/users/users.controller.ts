import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users.service';
import { ResponseUtil } from '../../utils/response.util';

const usersService = new UsersService();

export class UsersController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await usersService.getAll(req.user!.storeId);
      ResponseUtil.success(res, users);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.getById(req.params.id, req.user!.storeId);
      ResponseUtil.success(res, user);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.create(req.body, req.user!.storeId);
      ResponseUtil.success(res, user, 'Utilisateur créé avec succès', 201);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.update(req.params.id, req.body, req.user!.storeId);
      ResponseUtil.success(res, user, 'Utilisateur mis à jour avec succès');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await usersService.delete(req.params.id, req.user!.storeId);
      ResponseUtil.success(res, null, 'Utilisateur supprimé avec succès');
    } catch (error) {
      next(error);
    }
  }
}
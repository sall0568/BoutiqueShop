import { Request, Response, NextFunction } from 'express';
import { CategoriesService } from './categories.service';
import { ResponseUtil } from '../../utils/response.util';

const categoriesService = new CategoriesService();

export class CategoriesController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoriesService.getAll(req.user!.storeId);
      ResponseUtil.success(res, categories);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoriesService.getById(req.params.id, req.user!.storeId);
      ResponseUtil.success(res, category);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoriesService.create(req.body, req.user!.storeId);
      ResponseUtil.success(res, category, 'Catégorie créée avec succès', 201);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoriesService.update(req.params.id, req.body, req.user!.storeId);
      ResponseUtil.success(res, category, 'Catégorie mise à jour avec succès');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await categoriesService.delete(req.params.id, req.user!.storeId);
      ResponseUtil.success(res, null, 'Catégorie supprimée avec succès');
    } catch (error) {
      next(error);
    }
  }
}
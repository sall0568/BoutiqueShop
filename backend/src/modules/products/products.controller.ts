import { Request, Response, NextFunction } from 'express';
import { ProductsService } from './products.service';
import { ResponseUtil } from '../../utils/response.util';

const productsService = new ProductsService();

export class ProductsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = {
        search: req.query.search as string,
        categoryId: req.query.categoryId as string,
        isActive: req.query.isActive === 'true' ? true : req.query.isActive === 'false' ? false : undefined,
        lowStock: req.query.lowStock === 'true',
      };

      const products = await productsService.getAll(req.user!.storeId, filters);
      ResponseUtil.success(res, products);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productsService.getById(req.params.id, req.user!.storeId);
      ResponseUtil.success(res, product);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productsService.create(req.body, req.user!.storeId);
      ResponseUtil.success(res, product, 'Produit créé avec succès', 201);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productsService.update(req.params.id, req.body, req.user!.storeId);
      ResponseUtil.success(res, product, 'Produit mis à jour avec succès');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await productsService.delete(req.params.id, req.user!.storeId);
      ResponseUtil.success(res, null, 'Produit supprimé avec succès');
    } catch (error) {
      next(error);
    }
  }

  async getLowStock(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productsService.getLowStock(req.user!.storeId);
      ResponseUtil.success(res, products);
    } catch (error) {
      next(error);
    }
  }
}
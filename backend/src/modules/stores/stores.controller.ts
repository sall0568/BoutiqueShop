import { Request, Response, NextFunction } from 'express';
import { StoresService } from './stores.service';
import { ResponseUtil } from '../../utils/response.util';

const storesService = new StoresService();

export class StoresController {
  async getCurrent(req: Request, res: Response, next: NextFunction) {
    try {
      const store = await storesService.getById(req.user!.storeId);
      ResponseUtil.success(res, store);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const store = await storesService.update(req.user!.storeId, req.body);
      ResponseUtil.success(res, store, 'Boutique mise à jour avec succès');
    } catch (error) {
      next(error);
    }
  }
}
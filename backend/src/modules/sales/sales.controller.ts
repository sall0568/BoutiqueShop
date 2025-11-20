import { Request, Response, NextFunction } from 'express';
import { SalesService } from './sales.service';
import { ResponseUtil } from '../../utils/response.util';

const salesService = new SalesService();

export class SalesController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = {
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string,
        paymentMethod: req.query.paymentMethod as string,
      };

      const sales = await salesService.getAll(req.user!.storeId, filters);
      ResponseUtil.success(res, sales);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const sale = await salesService.getById(req.params.id, req.user!.storeId);
      ResponseUtil.success(res, sale);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const sale = await salesService.create(req.body, req.user!.id, req.user!.storeId);
      ResponseUtil.success(res, sale, 'Vente créée avec succès', 201);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await salesService.delete(req.params.id, req.user!.storeId, req.user!.id);
      ResponseUtil.success(res, null, 'Vente annulée avec succès');
    } catch (error) {
      next(error);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await salesService.getStats(
        req.user!.storeId,
        req.query.startDate as string,
        req.query.endDate as string
      );
      ResponseUtil.success(res, stats);
    } catch (error) {
      next(error);
    }
  }
}
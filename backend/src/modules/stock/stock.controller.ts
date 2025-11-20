import { Request, Response, NextFunction } from 'express';
import { StockService } from './stock.service';
import { ResponseUtil } from '../../utils/response.util';
import { StockMovementType } from '@prisma/client';

const stockService = new StockService();

export class StockController {
  async getMovements(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = {
        productId: req.query.productId as string,
        type: req.query.type as StockMovementType,
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string,
      };

      const movements = await stockService.getMovements(req.user!.storeId, filters);
      ResponseUtil.success(res, movements);
    } catch (error) {
      next(error);
    }
  }

  async createMovement(req: Request, res: Response, next: NextFunction) {
    try {
      const movement = await stockService.createMovement(req.body, req.user!.id, req.user!.storeId);
      ResponseUtil.success(res, movement, 'Mouvement de stock créé avec succès', 201);
    } catch (error) {
      next(error);
    }
  }

  async getStockValue(req: Request, res: Response, next: NextFunction) {
    try {
      const value = await stockService.getStockValue(req.user!.storeId);
      ResponseUtil.success(res, value);
    } catch (error) {
      next(error);
    }
  }

  async getStockAlerts(req: Request, res: Response, next: NextFunction) {
    try {
      const alerts = await stockService.getStockAlerts(req.user!.storeId);
      ResponseUtil.success(res, alerts);
    } catch (error) {
      next(error);
    }
  }
}
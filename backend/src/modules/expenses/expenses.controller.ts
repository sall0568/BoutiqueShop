import { Request, Response, NextFunction } from 'express';
import { ExpensesService } from './expenses.service';
import { ResponseUtil } from '../../utils/response.util';

const expensesService = new ExpensesService();

export class ExpensesController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = {
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string,
        category: req.query.category as string,
      };

      const expenses = await expensesService.getAll(req.user!.storeId, filters);
      ResponseUtil.success(res, expenses);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const expense = await expensesService.getById(req.params.id, req.user!.storeId);
      ResponseUtil.success(res, expense);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const expense = await expensesService.create(req.body, req.user!.id, req.user!.storeId);
      ResponseUtil.success(res, expense, 'Dépense créée avec succès', 201);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const expense = await expensesService.update(req.params.id, req.body, req.user!.storeId);
      ResponseUtil.success(res, expense, 'Dépense mise à jour avec succès');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await expensesService.delete(req.params.id, req.user!.storeId);
      ResponseUtil.success(res, null, 'Dépense supprimée avec succès');
    } catch (error) {
      next(error);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await expensesService.getStats(
        req.user!.storeId,
        req.query.startDate as string,
        req.query.endDate as string
      );
      ResponseUtil.success(res, stats);
    } catch (error) {
      next(error);
    }
  }

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await expensesService.getCategories(req.user!.storeId);
      ResponseUtil.success(res, categories);
    } catch (error) {
      next(error);
    }
  }
}
import { Request, Response, NextFunction } from 'express';
import { DashboardService } from './dashboard.service';
import { ResponseUtil } from '../../utils/response.util';

const dashboardService = new DashboardService();

export class DashboardController {
  async getOverview(req: Request, res: Response, next: NextFunction) {
    try {
      const overview = await dashboardService.getOverview(
        req.user!.storeId,
        req.query.startDate as string,
        req.query.endDate as string
      );
      ResponseUtil.success(res, overview);
    } catch (error) {
      next(error);
    }
  }

  async getSalesChart(req: Request, res: Response, next: NextFunction) {
    try {
      const days = req.query.days ? parseInt(req.query.days as string) : 7;
      const chart = await dashboardService.getSalesChart(req.user!.storeId, days);
      ResponseUtil.success(res, chart);
    } catch (error) {
      next(error);
    }
  }

  async getTopProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const topProducts = await dashboardService.getTopProducts(req.user!.storeId, limit);
      ResponseUtil.success(res, topProducts);
    } catch (error) {
      next(error);
    }
  }

  async getRecentActivities(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const activities = await dashboardService.getRecentActivities(req.user!.storeId, limit);
      ResponseUtil.success(res, activities);
    } catch (error) {
      next(error);
    }
  }
}
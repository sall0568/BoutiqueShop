import { Router } from 'express';
import { DashboardController } from './dashboard.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const dashboardController = new DashboardController();

router.use(authMiddleware);

router.get('/overview', dashboardController.getOverview);
router.get('/sales-chart', dashboardController.getSalesChart);
router.get('/top-products', dashboardController.getTopProducts);
router.get('/activities', dashboardController.getRecentActivities);

export default router;
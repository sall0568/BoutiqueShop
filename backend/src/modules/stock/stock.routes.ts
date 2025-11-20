import { Router } from 'express';
import { StockController } from './stock.controller';
import { validateMiddleware } from '../../middlewares/validate.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { createStockMovementSchema, getStockMovementsSchema } from './stock.validation';

const router = Router();
const stockController = new StockController();

router.use(authMiddleware);

router.get('/movements', validateMiddleware(getStockMovementsSchema), stockController.getMovements);
router.post('/movements', validateMiddleware(createStockMovementSchema), stockController.createMovement);
router.get('/value', stockController.getStockValue);
router.get('/alerts', stockController.getStockAlerts);

export default router;
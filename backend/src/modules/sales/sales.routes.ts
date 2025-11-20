import { Router } from 'express';
import { SalesController } from './sales.controller';
import { validateMiddleware } from '../../middlewares/validate.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { createSaleSchema, getSalesSchema } from './sales.validation';

const router = Router();
const salesController = new SalesController();

router.use(authMiddleware);

router.get('/', validateMiddleware(getSalesSchema), salesController.getAll);
router.get('/stats', salesController.getStats);
router.get('/:id', salesController.getById);
router.post('/', validateMiddleware(createSaleSchema), salesController.create);
router.delete('/:id', salesController.delete);

export default router;
import { Router } from 'express';
import { ProductsController } from './products.controller';
import { validateMiddleware } from '../../middlewares/validate.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { createProductSchema, updateProductSchema, searchProductSchema } from './products.validation';

const router = Router();
const productsController = new ProductsController();

router.use(authMiddleware);

router.get('/', validateMiddleware(searchProductSchema), productsController.getAll);
router.get('/low-stock', productsController.getLowStock);
router.get('/:id', productsController.getById);
router.post('/', validateMiddleware(createProductSchema), productsController.create);
router.put('/:id', validateMiddleware(updateProductSchema), productsController.update);
router.delete('/:id', productsController.delete);

export default router;
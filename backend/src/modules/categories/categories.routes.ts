import { Router } from 'express';
import { CategoriesController } from './categories.controller';
import { validateMiddleware } from '../../middlewares/validate.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { createCategorySchema, updateCategorySchema } from './categories.validation';

const router = Router();
const categoriesController = new CategoriesController();

router.use(authMiddleware);

router.get('/', categoriesController.getAll);
router.get('/:id', categoriesController.getById);
router.post('/', validateMiddleware(createCategorySchema), categoriesController.create);
router.put('/:id', validateMiddleware(updateCategorySchema), categoriesController.update);
router.delete('/:id', categoriesController.delete);

export default router;
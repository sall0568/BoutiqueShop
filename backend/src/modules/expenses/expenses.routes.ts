import { Router } from 'express';
import { ExpensesController } from './expenses.controller';
import { validateMiddleware } from '../../middlewares/validate.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { createExpenseSchema, updateExpenseSchema, getExpensesSchema } from './expenses.validation';

const router = Router();
const expensesController = new ExpensesController();

router.use(authMiddleware);

router.get('/', validateMiddleware(getExpensesSchema), expensesController.getAll);
router.get('/stats', expensesController.getStats);
router.get('/categories', expensesController.getCategories);
router.get('/:id', expensesController.getById);
router.post('/', validateMiddleware(createExpenseSchema), expensesController.create);
router.put('/:id', validateMiddleware(updateExpenseSchema), expensesController.update);
router.delete('/:id', expensesController.delete);

export default router;
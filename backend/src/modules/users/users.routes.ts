import { Router } from 'express';
import { UsersController } from './users.controller';
import { validateMiddleware } from '../../middlewares/validate.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { createUserSchema, updateUserSchema } from './users.validation';
import { UserRole } from '@prisma/client';

const router = Router();
const usersController = new UsersController();

router.use(authMiddleware);
router.use(roleMiddleware(UserRole.ADMIN));

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', validateMiddleware(createUserSchema), usersController.create);
router.put('/:id', validateMiddleware(updateUserSchema), usersController.update);
router.delete('/:id', usersController.delete);

export default router;
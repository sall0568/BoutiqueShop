import { Router } from 'express';
import { StoresController } from './stores.controller';
import { validateMiddleware } from '../../middlewares/validate.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { updateStoreSchema } from './stores.validation';
import { UserRole } from '@prisma/client';

const router = Router();
const storesController = new StoresController();

router.use(authMiddleware);

router.get('/', storesController.getCurrent);
router.put('/', roleMiddleware(UserRole.ADMIN), validateMiddleware(updateStoreSchema), storesController.update);

export default router;
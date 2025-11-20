import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validateMiddleware } from '../../middlewares/validate.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { registerSchema, loginSchema } from './auth.validation';

const router = Router();
const authController = new AuthController();

router.post('/register', validateMiddleware(registerSchema), authController.register);
router.post('/login', validateMiddleware(loginSchema), authController.login);
router.get('/me', authMiddleware, authController.getCurrentUser);

export default router;
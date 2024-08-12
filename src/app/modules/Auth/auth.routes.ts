import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/ValidateRequest';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { User_Role } from '../User/user.constants';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginSchema),
  AuthController.loginUser,
);

router.post(
  '/change-password',
  auth(User_Role.admin, User_Role.user),
  validateRequest(AuthValidation.changePasswordSchema),
  AuthController.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenSchema),
  AuthController.refreshToken,
);

export const AuthRoutes = router;

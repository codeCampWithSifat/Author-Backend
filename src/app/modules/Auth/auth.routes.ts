import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/ValidateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginSchema),
  AuthController.loginUser,
);

export const AuthRoutes = router;

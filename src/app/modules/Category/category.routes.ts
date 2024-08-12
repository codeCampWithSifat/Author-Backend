import express from 'express';
import { CategoryController } from './category.controller';
import validateRequest from '../../middlewares/ValidateRequest';
import { CategorySchema } from './category.validation';
import auth from '../../middlewares/auth';
import { User_Role } from '../User/user.constants';

const router = express.Router();

router.post(
  '/create-category',
  auth(User_Role.admin),
  validateRequest(CategorySchema.createAndupdateCategorySchema),
  CategoryController.createCategory,
);

router.get('/:id', CategoryController.getSingleCategory);
router.patch(
  '/:id',
  //   validateRequest(CategorySchema.createAndupdateCategorySchema),
  CategoryController.updateSingleCategory,
);
router.delete('/:id', CategoryController.deleteSingleCategory);

router.get('/', CategoryController.getAllCategory);

export const CategoryRoutes = router;

import express from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/ValidateRequest';
import { CourseValidation } from './course.validation';
import auth from '../../middlewares/auth';
import { User_Role } from '../User/user.constants';

const router = express.Router();

router.post(
  '/create-course',
  auth(User_Role.admin),
  validateRequest(CourseValidation.courseSchemaValidation),
  CourseController.createCourse,
);

router.get('/:courseId', CourseController.getSingleCourse);
router.patch(
  '/:courseId',
  validateRequest(CourseValidation.courseSchemaUpdateValidation),
  CourseController.updateCourse,
);
router.delete('/:courseId', CourseController.deleteCourse);

router.get('/:courseId/reviews', CourseController.reviewCourse);
router.get('/', CourseController.getAllFromDB);

export const CourseRoutes = router;

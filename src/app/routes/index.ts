import { Router } from 'express';
import { CategoryRoutes } from '../modules/Category/category.routes';
import { CourseRoutes } from '../modules/Course/course.routes';
import { ReviewRoutes } from '../modules/Review/review.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

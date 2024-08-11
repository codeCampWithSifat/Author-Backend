import { Router } from 'express';
import { CategoryRoutes } from '../modules/Category/category.routes';
import { CourseRoutes } from '../modules/Course/course.routes';
import { ReviewRoutes } from '../modules/Review/review.routes';
import { UserRoutes } from '../modules/User/user.routes';

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
  {
    path: '/users',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

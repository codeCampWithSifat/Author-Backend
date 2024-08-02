import { z } from 'zod';

const createReviewSchema = z.object({
  body: z.object({
    courseId: z.string({ required_error: 'Course Id is Required' }),
    rating: z.number({ required_error: 'Rating is Required' }),
    review: z.string({ required_error: 'Review is Required' }),
  }),
});

export const ReviewValidation = {
  createReviewSchema,
};

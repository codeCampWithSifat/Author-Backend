import { z } from 'zod';

const createAndupdateCategorySchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is Required' }),
  }),
});

export const CategorySchema = {
  createAndupdateCategorySchema,
};

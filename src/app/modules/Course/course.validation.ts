import { z } from 'zod';

const tagsSchema = z.object({
  name: z.string({ required_error: 'Name is Required' }),
  isDeleted: z.boolean().default(false).optional(),
});

const courseSchemaValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is Required' }),
    instructor: z.string({ required_error: 'Instuctor is Required' }),
    categoryId: z.string({ required_error: 'Category is Required' }),
    price: z.number({ required_error: 'Price is Required' }),
    tags: z.array(tagsSchema),
    startDate: z.string({ required_error: 'Start Date is Required' }),
    endDate: z.string({ required_error: 'End Date is Required' }),
    language: z.string({ required_error: 'Language is Required' }),
    provider: z.string({ required_error: 'Provider is Required' }),
    details: z.object({
      level: z.string({ required_error: 'Level is Required' }),
      description: z.string({ required_error: 'Description Is Required' }),
    }),
  }),
});

const updateTagsSchema = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean().default(false).optional(),
});

const courseSchemaUpdateValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(updateTagsSchema).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: z
      .object({
        level: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
  }),
});

export const CourseValidation = {
  courseSchemaValidation,
  courseSchemaUpdateValidation,
};

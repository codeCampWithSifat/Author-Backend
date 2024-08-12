import { z } from 'zod';

const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is Required' }),
    password: z.string({ required_error: 'Password Is Required' }),
  }),
});

export const AuthValidation = {
  loginSchema,
};

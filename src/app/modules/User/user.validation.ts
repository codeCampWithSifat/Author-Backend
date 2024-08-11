import { z } from 'zod';

const createUserValidation = z.object({
  body: z.object({
    userName: z.string({ required_error: 'User Name Is Required' }),
    email: z.string({ required_error: 'Email is Required' }).email(),
    password: z.string({ required_error: 'Password Is Required' }),
  }),
});

export const UserValidation = {
  createUserValidation,
};

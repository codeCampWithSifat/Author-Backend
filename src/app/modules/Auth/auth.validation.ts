import { z } from 'zod';

const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is Required' }),
    password: z.string({ required_error: 'Password Is Required' }),
  }),
});

const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: 'Current Password is Required',
    }),
    newPassword: z.string({ required_error: 'New Password is Required' }),
  }),
});

const refreshTokenSchema = z.object({
  cookies: z.object({
    refreshToken: z.string(),
  }),
});

export const AuthValidation = {
  loginSchema,
  changePasswordSchema,
  refreshTokenSchema,
};

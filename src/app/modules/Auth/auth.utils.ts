import jwt from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const AuthUtils = {
  createToken,
};

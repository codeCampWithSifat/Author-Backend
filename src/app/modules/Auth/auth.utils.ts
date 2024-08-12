import jwt, { JwtPayload } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const AuthUtils = {
  createToken,
  verifyToken,
};

import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: IUser) => {
  payload.role = 'user';
  const result = await User.create(payload);
  return result;
};

const createAdmin = async (payload: IUser) => {
  payload.role = 'admin';
  const result = await User.create(payload);
  return result;
};

export const UserService = {
  createUser,
  createAdmin,
};

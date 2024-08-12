import { User_Role } from './user.constants';

export type IUser = {
  userName: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
  passwordChangedAt?: Date;
};

export type TUserRole = keyof typeof User_Role;

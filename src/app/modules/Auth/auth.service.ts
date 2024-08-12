import httpStatus from 'http-status';
import ApiError from '../../middlewares/ApiError';
import { User } from '../User/user.model';
import { ILogin } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { AuthUtils } from './auth.utils';

const loginUser = async (payload: ILogin) => {
  const { email, password } = payload;
  const isExitUser = await User.findOne({ email }).select('+password');
  if (!isExitUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Your Not Exist In The World');
  }
  if (isExitUser?.isDeleted) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Your Account Has Been Deleted');
  }
  if (isExitUser?.status === 'blocked') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Your Account Has Been Blocked');
  }
  const checkPassword = await bcrypt.compare(
    password,
    isExitUser?.password as string,
  );

  if (!checkPassword) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Email/Password Not Matched');
  }

  const userPayload = {
    _id: isExitUser?._id,
    email: isExitUser?.email,
    role: isExitUser?.role,
  };

  const accessToken = AuthUtils.createToken(
    userPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiresIn as string,
  );

  const refreshToken = AuthUtils.createToken(
    userPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expiresIn as string,
  );

  const user = {
    _id: isExitUser?._id,
    userName: isExitUser?.userName,
    email: isExitUser?.email,
    role: isExitUser?.role,
  };

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  loginUser,
};

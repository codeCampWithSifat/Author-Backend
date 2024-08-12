import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import ApiError from './ApiError';
import config from '../config';
import { User } from '../modules/User/user.model';
import { AuthUtils } from '../modules/Auth/auth.utils';
import { TUserRole } from '../modules/User/user.interface';

const auth = (...userRole: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Token Not Found');
    }

    const decoded = AuthUtils.verifyToken(
      token,
      config.jwt_access_secret as string,
    );

    const isExitUser = await User.findOne({ email: decoded?.email });

    if (isExitUser?.status === 'blocked') {
      throw new ApiError(httpStatus.FORBIDDEN, 'Your Acccount Was Blocked');
    }

    if (isExitUser?.isDeleted) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Your Acccount Was Deleted');
    }

    if (userRole && !userRole.includes(decoded?.role)) {
      throw new ApiError(httpStatus.FORBIDDEN, 'You Are Not Authorized');
    }

    req.user = decoded;

    next();
  });
};

export default auth;

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, ...others } = result;

  const options = {
    secure: config.node_env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Login Successfully',
    data: others,
  });
});

export const AuthController = {
  loginUser,
};

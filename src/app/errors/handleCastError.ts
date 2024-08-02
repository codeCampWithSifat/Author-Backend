import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSource = [
    {
      path: error?.path,
      message: error?.message.slice(0, 33),
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'Cast Error Are Done',
    errorSources,
  };
};

export default handleCastError;

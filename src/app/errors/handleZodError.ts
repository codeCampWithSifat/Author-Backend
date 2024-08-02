import { ZodError } from 'zod';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSource = error.issues.map((issue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Zod Error',
    errorSources,
  };
};

export default handleZodError;

import { Response } from "express";

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  errorMessages?: {
    path: string;
    message: string;
  }[];
  stack?: string;
};

const sendResponse = <T>(res: Response, payload: TResponse<T>) => {
  const { success, statusCode, message, data, errorMessages, stack } = payload;

  return res.status(statusCode).json({
    success,
    statusCode,
    message,
    ...(data !== undefined ? { data } : {}),
    ...(errorMessages ? { errorMessages } : {}),
    ...(stack !== undefined ? { stack } : {}),
  });
};

export default sendResponse;

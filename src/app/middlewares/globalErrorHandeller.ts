import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import sendResponse from "../utils/sendResponse";

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorMessages: {
    path: string;
    message: string;
  }[] = [];

  if (error instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation Error";

    errorMessages = Object.values(error.errors).map((err) => ({
      path: err.path,
      message: err.message,
    }));
  } else if (error instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "Invalid Object Id";

    errorMessages = [
      {
        path: error.path,
        message: error.message,
      },
    ];
  } else if (error.code === 11000) {
    statusCode = 409;
    message = "Duplicate Value";

    const field = Object.keys(error.keyValue)[0];

    errorMessages = [
      {
        path: field,
        message: `${field} already exists.`,
      },
    ];
  } else if (error instanceof Error) {
    statusCode = 400;
    message = error.message;

    errorMessages = [
      {
        path: "",
        message: error.message,
      },
    ];
  }

  return sendResponse(res, {
    success: false,
    statusCode,
    message,
    errorMessages,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });
};

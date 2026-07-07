import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const login = async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Login successful",
    data: result,
  });
};

export const AuthController = {
  login,
};
import { Request, Response } from "express";
import { authService } from "./auth.service";

const login = async (
  req: Request,
  res: Response
) => {
  const result = await authService.login(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
};

export const AuthController = {
  login,
};
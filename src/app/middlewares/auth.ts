import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwt.service";
import { UserModel } from "../modules/users/user.model";
import AppError from "../errors/appError";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new AppError(401, "Access token is required.");
    }

    const accessToken = authHeader.split(" ")[1];

    const refreshToken = req.headers["x-refresh-token"] as string | undefined;

    if (!accessToken) {
      throw new AppError(401, "Access token is required.");
    }

    if (!refreshToken) {
      throw new AppError(401, "Refresh token is required.");
    }

    console.log("Access Token ====>>>", accessToken);
    console.log("Refresh Token ====>>>", refreshToken);

    // Verify access token
    const decoded = jwtService.verifyAccessToken(accessToken);

    // Check user still exists
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      throw new AppError(401, "User not found.");
    }

    if (user.isDeleted) {
      throw new AppError(403, "User has been deleted.");
    }

    console.log("Decoded user ====>>>", decoded);

    req.user = decoded;
    req.accessToken = accessToken;
    req.refreshToken = refreshToken;

    next();
  } catch (error) {
    next(error);
  }
};

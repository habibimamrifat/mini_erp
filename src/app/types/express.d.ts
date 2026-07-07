import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      accessToken?: string;
      refreshToken?: string;
    }
  }
}

export {};
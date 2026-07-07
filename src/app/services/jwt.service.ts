import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../config";

const createAccessToken = (payload: object) => {
  return jwt.sign(payload, config.jwt_access_secret!, {
    expiresIn:
      config.jwt_access_expires_in as SignOptions["expiresIn"],
  });
};

const createRefreshToken = (payload: object) => {
  return jwt.sign(payload, config.jwt_refresh_secret!, {
    expiresIn:
      config.jwt_refresh_expires_in as SignOptions["expiresIn"],
  });
};

const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(
    token,
    config.jwt_access_secret!
  ) as JwtPayload;
};

const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(
    token,
    config.jwt_refresh_secret!
  ) as JwtPayload;
};

export const jwtService = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
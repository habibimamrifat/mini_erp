"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const createAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
};
const createRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.jwt_refresh_secret, {
        expiresIn: config_1.default.jwt_refresh_expires_in,
    });
};
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
};
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
};
exports.jwtService = {
    createAccessToken,
    createRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};

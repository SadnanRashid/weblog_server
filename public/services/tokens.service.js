"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config/config"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const token_1 = require("../config/token");
const db_1 = require("../config/db");
const generateToken = (userId, expires, type, secret = config_1.default.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: (0, moment_1.default)().unix(),
        exp: expires.unix(),
        type,
    };
    return jsonwebtoken_1.default.sign(payload, secret);
};
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    const query = `
    INSERT INTO token (token, refuser, expires, type, blacklisted)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
    const params = [token, userId, expires.toISOString(), type, blacklisted];
    try {
        const tokenDoc = await db_1.db.queryOne(query, params);
        return tokenDoc;
    }
    catch (error) {
        console.error("Error saving token:", error);
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Internal error");
    }
};
const verifyToken = async (token, type) => {
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
        const query = `
      SELECT * FROM token WHERE token = $1 AND refuser = $2 AND type = $3 AND blacklisted = false
    `;
        const params = [token, payload.sub, type];
        const tokenDoc = await db_1.db.queryOne(query, params);
        console.log(token, payload.sub, type);
        if (!tokenDoc) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Token not found");
        }
        return tokenDoc;
    }
    catch (error) {
        console.error("Error verifying token:", error);
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Internal error");
    }
};
const generateAuthTokens = async (user) => {
    const accessTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.accessExpirationMinutes, "minutes");
    const accessToken = generateToken(user.user_id, accessTokenExpires, token_1.tokenTypes.ACCESS);
    const refreshTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.refreshExpirationDays, "days");
    const refreshToken = generateToken(user.user_id, refreshTokenExpires, token_1.tokenTypes.REFRESH);
    await saveToken(refreshToken, user.user_id, refreshTokenExpires, token_1.tokenTypes.REFRESH);
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};
const generateVerifyEmailToken = async (user) => {
    const expires = (0, moment_1.default)().add(config_1.default.jwt.verifyEmailExpirationMinutes, "minutes");
    const verifyEmailToken = generateToken(user.user_id, expires, token_1.tokenTypes.VERIFY_EMAIL);
    await saveToken(verifyEmailToken, user.user_id, expires, token_1.tokenTypes.VERIFY_EMAIL);
    return verifyEmailToken;
};
exports.tokenService = {
    generateVerifyEmailToken,
    generateAuthTokens,
    generateToken,
    verifyToken,
    saveToken,
};

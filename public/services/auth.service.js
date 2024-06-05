"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const tokens_service_1 = require("./tokens.service");
const users_service_1 = require("./users.service");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const token_1 = require("../config/token");
const db_1 = require("../config/db");
const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await users_service_1.userService.getUserByEmail(email, password);
    return user;
};
const logout = async (refreshToken) => {
    const refreshTokenDoc = await db_1.db.queryOne(`SELECT * FROM tokens WHERE token = $1 AND type = $2`, [refreshToken, token_1.tokenTypes.REFRESH]);
    if (!refreshTokenDoc) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Not found");
    }
    await db_1.db.query(`DELETE FROM tokens WHERE token = $1 AND type = $2`, [
        refreshToken,
        token_1.tokenTypes.REFRESH,
    ]);
};
const refreshAuth = async (refreshToken) => {
    try {
        const refreshTokenDoc = await tokens_service_1.tokenService.verifyToken(refreshToken, token_1.tokenTypes.REFRESH);
        const user = await users_service_1.userService.getUser(refreshTokenDoc.refuser);
        if (!user) {
            throw new Error();
        }
        await db_1.db.query(`DELETE FROM tokens WHERE token = $1 AND type = $2`, [
            refreshToken,
            token_1.tokenTypes.REFRESH,
        ]);
        const ret = tokens_service_1.tokenService.generateAuthTokens(user);
        return ret;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Please authenticate");
    }
};
exports.authService = {
    loginUserWithEmailAndPassword,
    logout,
    refreshAuth,
};

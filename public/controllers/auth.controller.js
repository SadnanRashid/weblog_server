"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const users_service_1 = require("../services/users.service");
const tokens_service_1 = require("../services/tokens.service");
const auth_service_1 = require("../services/auth.service");
const register = (0, catchAsync_1.default)(async (req, res) => {
    const user = await users_service_1.userService.createUser(req.body);
    console.log(user);
    const tokens = await tokens_service_1.tokenService.generateAuthTokens(user);
    res.status(http_status_1.default.CREATED).send({ user, tokens });
});
const login = (0, catchAsync_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const user = await auth_service_1.authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokens_service_1.tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
});
const logout = (0, catchAsync_1.default)(async (req, res) => {
    await auth_service_1.authService.logout(req.body.refreshToken);
    res.status(http_status_1.default.NO_CONTENT).send();
});
const refreshTokens = (0, catchAsync_1.default)(async (req, res) => {
    const tokens = await auth_service_1.authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
});
exports.authController = {
    register,
    login,
    logout,
    refreshTokens,
};

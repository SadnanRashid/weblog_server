"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = express_1.default.Router();
authRouter.post("/register", auth_controller_1.authController.register);
authRouter.post("/login", auth_controller_1.authController.login);
authRouter.post("/logout", auth_controller_1.authController.logout);
authRouter.post("/refresh-tokens", auth_controller_1.authController.refreshTokens);
exports.default = authRouter;

import express from "express";
import validate from "../middlewares/validate";
import { authController } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/refresh-tokens", authController.refreshTokens);

export default authRouter;

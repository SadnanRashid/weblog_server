import express from "express";
import validate from "../middlewares/validate";
import { userController } from "../controllers/users.controller";

const userRouter = express.Router();

userRouter.get("/get", userController.getUser);

export default userRouter;

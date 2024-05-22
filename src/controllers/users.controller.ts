import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import ApiError from "../utils/ApiError";
import { userService } from "../services/users.service";
import { Request, Response } from "express";
// import { tokenService } from "../services/tokens.service";
// import { tokenTypes } from "../config/token";

const getUser = catchAsync(async (req: Request, res: Response) => {
  // const verify = await tokenService.verifyToken()
  const user = await userService.getUser(req.params.uid);
  res.send(user);
});

export const userController = { getUser };

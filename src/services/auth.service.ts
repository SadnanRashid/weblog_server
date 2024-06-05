import httpStatus from "http-status";
import { tokenService } from "./tokens.service";
import { userService } from "./users.service";
import ApiError from "../utils/ApiError";
import { tokenTypes } from "../config/token";
import { db } from "../config/db";
import { TUsers, TUsersWithoutPass } from "../models/users.models";

const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<TUsersWithoutPass> => {
  const user = await userService.getUserByEmail(email, password);
  return user;
};

const logout = async (refreshToken: string): Promise<void> => {
  const refreshTokenDoc = await db.queryOne(
    `SELECT * FROM tokens WHERE token = $1 AND type = $2`,
    [refreshToken, tokenTypes.REFRESH]
  );
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  await db.query(`DELETE FROM tokens WHERE token = $1 AND type = $2`, [
    refreshToken,
    tokenTypes.REFRESH,
  ]);
};

const refreshAuth = async (refreshToken: string) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await userService.getUser(refreshTokenDoc.refuser);
    if (!user) {
      throw new Error();
    }
    await db.query(`DELETE FROM tokens WHERE token = $1 AND type = $2`, [
      refreshToken,
      tokenTypes.REFRESH,
    ]);
    const ret = tokenService.generateAuthTokens(user);
    return ret;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

export const authService = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
};

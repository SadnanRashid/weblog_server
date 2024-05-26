import jwt from "jsonwebtoken";
import moment from "moment";
import httpStatus from "http-status";
import config from "../config/config";
import { userService } from "./users.service";
import { TToken } from "../models/token.models";
import ApiError from "../utils/ApiError";
import { tokenTypes } from "../config/token";
import { db } from "../config/db";
import { TUsers, TUsersWithoutPass } from "../models/users.models";

const generateToken = (
  userId: string,
  expires: moment.Moment,
  type: string,
  secret: string = config.jwt.secret
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (
  token: string,
  userId: string,
  expires: moment.Moment,
  type: string,
  blacklisted = false
): Promise<TToken> => {
  const query = `
    INSERT INTO token (token, refuser, expires, type, blacklisted)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const params = [token, userId, expires.toISOString(), type, blacklisted];

  try {
    const tokenDoc = await db.queryOne(query, params);
    return tokenDoc;
  } catch (error) {
    console.error("Error saving token:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal error");
  }
};

const verifyToken = async (token: string, type: string): Promise<TToken> => {
  try {
    const payload = jwt.verify(token, config.jwt.secret) as { sub: string };
    const query = `
      SELECT * FROM token WHERE token = $1 AND refuser = $2 AND type = $3 AND blacklisted = false
    `;
    const params = [token, payload.sub, type];
    const tokenDoc = await db.queryOne(query, params);

    if (!tokenDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, "Token not found");
    }
    return tokenDoc;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal error");
  }
};

const generateAuthTokens = async (user: TUsersWithoutPass) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(
    user.user_id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(
    user.user_id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    user.user_id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

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

const generateVerifyEmailToken = async (user: TUsers): Promise<string> => {
  const expires = moment().add(
    config.jwt.verifyEmailExpirationMinutes,
    "minutes"
  );
  const verifyEmailToken = generateToken(
    user.user_id,
    expires,
    tokenTypes.VERIFY_EMAIL
  );
  await saveToken(
    verifyEmailToken,
    user.user_id,
    expires,
    tokenTypes.VERIFY_EMAIL
  );
  return verifyEmailToken;
};

export const tokenService = {
  generateVerifyEmailToken,
  generateAuthTokens,
  generateToken,
  verifyToken,
  saveToken,
};

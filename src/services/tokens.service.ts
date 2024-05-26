import jwt from "jsonwebtoken";
import moment from "moment";
import httpStatus from "http-status";
import config from "../config/config";
import { userService } from "./users.service";
import { TToken } from "../models/token.models";
import ApiError from "../utils/ApiError";
import { tokenTypes } from "../config/token";
import { db } from "../config/db";
import { TUsers } from "../models/users.models";

const generateToken = (
  userId: string,
  expires: any,
  type: string,
  secret: string = config.jwt.secret
) => {
  console.log("generating token");
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
  expires: any,
  type: string,
  blacklisted = false
) => {
  const tokenDoc =
    await db.queryOne(`INSERT INTO tokens (token, userref, expires, type, blacklisted) VALUES 
    (
        '${token}',
        '${userId}',
        '${expires}',
        '${type}',
        '${blacklisted}'
    )
    `);
  return tokenDoc;
};

const verifyToken = async (token: string, type: string) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await db.queryOne(`
        SELECT * FROM tokens WHERE token = '${token}' AND user = '${payload.sub}' AND type = '${type}' AND blacklisted = false`);
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

const generateAuthTokens = async (user: TUsers) => {
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

  console.log({
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  });

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

const generateVerifyEmailToken = async (user: TUsers) => {
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

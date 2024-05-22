import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import { db } from "../config/db";
import { TUsers } from "../models/users.models";
import bcrypt from "bcryptjs";

const createUser = async (data: {
  email: string;
  name: string;
  pass: string;
}): Promise<TUsers> => {
  const password: string = await bcrypt.hash(data.pass, 8);
  let res: TUsers =
    await db.queryOne(`INSERT INTO USERS (user_id, name, email, pass, created_at)
    VALUES (uuid_generate_v4(),  '${data.name}', '${data.email}', '${password}', CURRENT_TIMESTAMP ) returning *`);
  return res;
};

const getUser = async (uid: string): Promise<TUsers> => {
  let res: TUsers = await db.queryOne(
    `SELECT * FROM users WHERE user_id = '${uid}'`
  );
  return res;
};

const getUserByEmail = async (
  email: string,
  password: string
): Promise<TUsers> => {
  let res: TUsers = await db.queryOne(
    `SELECT * FROM users WHERE email = '${email}'`
  );
  const decryptPassword = await bcrypt.hash(res.pass, 8);
  if (!res || decryptPassword !== password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return res;
};

const isEmailTaken = async (queryEmail: string): Promise<Boolean> => {
  const result = await db.query(
    `select email from users where email = '${queryEmail}'`
  );
  if (result?.length > 0) {
    return true;
  }
  return false;
};

export const userService = { getUser, getUserByEmail, createUser };

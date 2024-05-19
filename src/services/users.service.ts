import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import { db } from "../config/db";
import { TUsers } from "../models/users.models";

const createUser = async (data: ) => {

}

const isEmailTaken = async (queryEmail: string): Promise<Boolean> => {
  const result = await db.query(
    `select email from users where email = '${queryEmail}'`
  );
  if (result?.length > 0) {
    return true;
  }
  return false;
};

export { isEmailTaken };

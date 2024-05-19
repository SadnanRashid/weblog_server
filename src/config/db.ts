import { pool } from "../index";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import { PoolClient } from "pg";

let client: PoolClient;

const db = {
  query: async function (query: string) {
    try {
      client = await pool.connect();
      const res = await client.query(query);
      return res.rows;
    } catch (err) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Internal error");
    } finally {
      client.release();
    }
  },
};

export { db };

import { pool } from "../index";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import { PoolClient } from "pg";

let client: PoolClient;

const db = {
  query: async function (query: string, params: any[] = []) {
    let client;
    try {
      client = await pool.connect();
      const res = await client.query(query, params);
      return res.rows;
    } catch (err) {
      console.error(err);
      throw new ApiError(httpStatus.BAD_REQUEST, "Internal error");
    } finally {
      if (client) client.release();
    }
  },
  queryOne: async function (query: string, params: any[] = []) {
    let client;
    try {
      client = await pool.connect();
      const res = await client.query(query, params);
      return res.rows[0];
    } catch (err) {
      console.error(err);
      throw new ApiError(httpStatus.BAD_REQUEST, "Internal error");
    } finally {
      if (client) client.release();
    }
  },
};

export { db };

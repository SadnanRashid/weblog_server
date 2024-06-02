import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import { db } from "../config/db";
import {
  TBlogs,
  TBlogView,
  TFullBlogPost,
  TComment,
} from "../models/blogs.model";
import { TSave } from "../models/saves.model";

const saveBlog = async (blog_id: string, user_id: string): Promise<TSave> => {
  const check = await db.queryOne(
    `SELECT * FROM saves WHERE user_id = $1 AND blog_id = $2`,
    [user_id, blog_id]
  );
  if (check) {
    const res = await db.queryOne(
      `DELETE FROM saves WHERE user_id = $1 AND blog_id = $2 RETURNING *`,
      [user_id, blog_id]
    );
    return res;
  }
  const res = await db.queryOne(
    `INSERT INTO saves (blog_id, user_id) VALUES ($1, $2) RETURNING *`,
    [blog_id, user_id]
  );
  return res;
};

const getSavesByUserId = async (user_id: string): Promise<TSave[] | null> => {
  const res = await db.query(
    `SELECT * FROM saves WHERE user_id = $1 RETURNING *`,
    [user_id]
  );
  return res;
};

const getSavesByBlogId = async (blog_id: string): Promise<TSave[] | null> => {
  const res = await db.query(
    `SELECT * FROM saves WHERE blog_id = $1 RETURNING *`,
    [blog_id]
  );
  return res;
};

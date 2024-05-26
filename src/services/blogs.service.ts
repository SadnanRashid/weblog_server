import httpStatus from "http-status";
import { tokenService } from "./tokens.service";
import { userService } from "./users.service";
import ApiError from "../utils/ApiError";
import { tokenTypes } from "../config/token";
import { db } from "../config/db";
import { TBlogs } from "../models/blogs.model";

const createBlog = async (data: TBlogs) => {
  const res = await db.queryOne(
    `
        INSERT INTO blogs (title, content, category, tags, user_id) VALUES
        ($1, $2, $3, $4, $5)
        RETURNING *
    `,
    [data.title, data.content, data.category, data.tags, data.user_id]
  );
  return res;
};

export const blogService = {
  createBlog,
};

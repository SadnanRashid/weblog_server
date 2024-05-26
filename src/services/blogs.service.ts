import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import { db } from "../config/db";
import { TBlogs, TBlogView } from "../models/blogs.model";

const createBlog = async (data: TBlogs): Promise<TBlogs> => {
  const res = await db.queryOne(
    `
    INSERT INTO blogs ( title, body, category, tags, user_id)
    VALUES ( $1, $2, $3, $4, $5)
    RETURNING *
  `,
    [data.title, data.body, data.category, data.tags, data.user_id]
  );
  return res;
};

// Get a single blog post
const getBlog = async (id: string): Promise<TBlogs> => {
  const res = await db.queryOne(
    `
        SELECT * FROM blogs WHERE blog_id = $1
    `,
    [id]
  );
  if (!res) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Something went wrong");
  }
  await addViews(res.blog_id);
  return res;
};

const addViews = async (blogid: string): Promise<TBlogView> => {
  const res = await db.queryOne(`INSERT INTO views (blog_id) VALUES ($1)`, [
    blogid,
  ]);
  return res;
};

export const blogService = {
  createBlog,
  getBlog,
  addViews,
};

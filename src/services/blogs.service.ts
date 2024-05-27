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

const paginateBlogs = async (limit: number, skip: number) => {
  const res = await db.query(
    `SELECT * FROM blogs FETCH FIRST $1 ROW ONLY OFFSET $2`,
    [limit, skip]
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
    throw new ApiError(httpStatus.BAD_REQUEST, "Blog does not exist");
  }
  await addViews(res.blog_id);
  return res;
};

const trendingBlogs = async () => {
  const res =
    await db.query(`SELECT blogs.title, blogs.category, blogs.blog_id, blogs.body, COUNT(views.blog_id) as viewcount
    FROM blogs INNER JOIN views ON views.blog_id = blogs.blog_id
    GROUP BY blogs.blog_id
    ORDER BY viewcount
    FETCH FIRST 5 ROW ONLY
    `);
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
  trendingBlogs,
  paginateBlogs,
};

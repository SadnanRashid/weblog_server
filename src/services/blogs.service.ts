import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import { db } from "../config/db";
import {
  TBlogs,
  TBlogView,
  TFullBlogPost,
  TComment,
} from "../models/blogs.model";

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
const getBlog = async (id: string): Promise<TFullBlogPost> => {
  const resBlog = await db.queryOne(
    `SELECT blogs.blog_id, blogs.title, blogs.body, blogs.category, blogs.tags, users.user_id, users.name, COUNT(views.blog_id)
     AS viewcount 
     FROM blogs
     INNER JOIN users ON blogs.user_id = users.user_id
     INNER JOIN views ON views.blog_id = blogs.blog_id
     WHERE blogs.blog_id = $1
     GROUP BY blogs.blog_id, users.user_id
     `,
    [id]
  );
  if (!resBlog) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Blog does not exist");
  }
  await addViews(resBlog.blog_id);
  return resBlog;
};

const getBlogComments = async (id: string): Promise<TComment[]> => {
  const resComments = await db.query(
    `SELECT comments.comment_id, comments.body, comments.created_at, users.user_id, users.name
    FROM comments
    INNER JOIN users ON comments.user_id = users.user_id
     WHERE comments.blog_id = $1 `,
    [id]
  );
  if (!resComments) {
    throw new ApiError(httpStatus.NO_CONTENT, "No Comments for this blog");
  }
  return resComments;
};

const postBlogComment = async (
  blog_id: string,
  body: string,
  user_id: string
): Promise<TComment> => {
  const createComment = await db.queryOne(
    `INSERT INTO comments blog_id, body, user_id VALUES ($1, $2, $3) returning *`,
    [blog_id, body, user_id]
  );
  return createComment;
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
  getBlogComments,
  postBlogComment,
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const db_1 = require("../config/db");
const createBlog = async (data) => {
    const res = await db_1.db.queryOne(`
    INSERT INTO blogs ( title, body, category, tags, user_id)
    VALUES ( $1, $2, $3, $4, $5)
    RETURNING *
  `, [data.title, data.body, data.category, data.tags, data.user_id]);
    return res;
};
const paginateBlogs = async (limit, skip) => {
    const res = await db_1.db.query(`SELECT * FROM blogs FETCH FIRST $1 ROW ONLY OFFSET $2`, [limit, skip]);
    return res;
};
// Get a single blog post
const getBlog = async (id) => {
    const resBlog = await db_1.db.queryOne(`SELECT blogs.blog_id, blogs.title, blogs.body, blogs.category, blogs.tags, users.user_id, users.name, COUNT(views.blog_id)
     AS viewcount 
     FROM blogs
     INNER JOIN users ON blogs.user_id = users.user_id
     INNER JOIN views ON views.blog_id = blogs.blog_id
     WHERE blogs.blog_id = $1
     GROUP BY blogs.blog_id, users.user_id
     `, [id]);
    if (!resBlog) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Blog does not exist");
    }
    await addViews(resBlog.blog_id);
    return resBlog;
};
const getBlogComments = async (id) => {
    const resComments = await db_1.db.query(`SELECT comments.comment_id, comments.body, comments.created_at, users.user_id, users.name
    FROM comments
    INNER JOIN users ON comments.user_id = users.user_id
     WHERE comments.blog_id = $1 `, [id]);
    if (!resComments) {
        throw new ApiError_1.default(http_status_1.default.NO_CONTENT, "No Comments for this blog");
    }
    return resComments;
};
const postBlogComment = async (blog_id, body, user_id) => {
    const createComment = await db_1.db.queryOne(`INSERT INTO comments blog_id, body, user_id VALUES ($1, $2, $3) returning *`, [blog_id, body, user_id]);
    return createComment;
};
const trendingBlogs = async () => {
    const res = await db_1.db.query(`SELECT blogs.title, blogs.category, blogs.blog_id, blogs.body, COUNT(views.blog_id) as viewcount
    FROM blogs INNER JOIN views ON views.blog_id = blogs.blog_id
    GROUP BY blogs.blog_id
    ORDER BY viewcount
    FETCH FIRST 5 ROW ONLY
    `);
    return res;
};
const addViews = async (blogid) => {
    const res = await db_1.db.queryOne(`INSERT INTO views (blog_id) VALUES ($1)`, [
        blogid,
    ]);
    return res;
};
exports.blogService = {
    createBlog,
    getBlog,
    addViews,
    trendingBlogs,
    paginateBlogs,
    getBlogComments,
    postBlogComment,
};

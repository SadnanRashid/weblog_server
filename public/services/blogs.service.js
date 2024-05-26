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
// Get a single blog post
const getBlog = async (id) => {
    const res = await db_1.db.queryOne(`
        SELECT * FROM blogs WHERE blog_id = $1
    `, [id]);
    if (!res) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Blog does not exist");
    }
    await addViews(res.blog_id);
    return res;
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
};

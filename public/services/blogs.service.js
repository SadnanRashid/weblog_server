"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogService = void 0;
const db_1 = require("../config/db");
const createBlog = async (data) => {
    const res = await db_1.db.queryOne(`
        INSERT INTO blogs (title, content, category, tags, user_id) VALUES
        ($1, $2, $3, $4, $5)
        RETURNING *
    `, [data.title, data.content, data.category, data.tags, data.user_id]);
    return res;
};
// Get a single blog post
const getBlog = async (id) => {
    const res = await db_1.db.queryOne(`
        SELECT * FROM blogs WHERE blog_id = $1
    `, [id]);
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
};

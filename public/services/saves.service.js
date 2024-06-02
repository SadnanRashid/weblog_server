"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savesService = void 0;
const db_1 = require("../config/db");
const saveBlog = async (blog_id, user_id) => {
    const check = await db_1.db.queryOne(`SELECT * FROM saves WHERE user_id = $1 AND blog_id = $2 RETURNING *`, [user_id, blog_id]);
    if (check.save_id) {
        const res = await db_1.db.queryOne(`DELETE FROM saves WHERE user_id = $1 AND blog_id = $2 RETURNING *`, [user_id, blog_id]);
        return res;
    }
    const res = await db_1.db.queryOne(`INSERT INTO saves (blog_id, user_id) VALUES ($1, $2) RETURNING *`, [blog_id, user_id]);
    return res;
};
const getSavesByUserId = async (user_id) => {
    const res = await db_1.db.query(`SELECT * FROM saves WHERE user_id = $1 RETURNING *`, [user_id]);
    return res;
};
const getSavesByBlogId = async (blog_id) => {
    const res = await db_1.db.query(`SELECT * FROM saves WHERE blog_id = $1 RETURNING *`, [blog_id]);
    return res;
};
exports.savesService = { getSavesByBlogId, getSavesByUserId, saveBlog };

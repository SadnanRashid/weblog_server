"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const db_1 = require("../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = async (data) => {
    const password = await bcryptjs_1.default.hash(data.pass, 8);
    let res = await db_1.db.queryOne(`INSERT INTO USERS (user_id, name, email, pass, created_at)
    VALUES (uuid_generate_v4(),  '${data.name}', '${data.email}', '${password}', CURRENT_TIMESTAMP ) returning *`);
    return res;
};
const getUser = async (uid) => {
    let res = await db_1.db.queryOne(`SELECT * FROM users WHERE user_id = '${uid}'`);
    return res;
};
const getUserByEmail = async (email, password) => {
    let res = await db_1.db.queryOne(`SELECT * FROM users WHERE email = '${email}'`);
    const decryptPassword = await bcryptjs_1.default.hash(res.pass, 8);
    if (!res || decryptPassword !== password) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Incorrect email or password");
    }
    return res;
};
const isEmailTaken = async (queryEmail) => {
    const result = await db_1.db.query(`select email from users where email = '${queryEmail}'`);
    if (result?.length > 0) {
        return true;
    }
    return false;
};
exports.userService = { getUser, getUserByEmail, createUser };

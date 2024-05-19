"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmailTaken = void 0;
const db_1 = require("../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = async (data) => {
    const result = await db_1.db.query(`INSERT INTO USERS (user_id, name, email, pass, created_at)
    VALUES (uuid_generate_v4(),  '${data.name}', '${data.email}', '${bcryptjs_1.default.hash(data.pass, 8)}', CURRENT_TIMESTAMP )`);
    return result;
};
const isEmailTaken = async (queryEmail) => {
    const result = await db_1.db.query(`select email from users where email = '${queryEmail}'`);
    if (result?.length > 0) {
        return true;
    }
    return false;
};
exports.isEmailTaken = isEmailTaken;

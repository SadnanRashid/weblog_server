"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmailTaken = void 0;
const db_1 = require("../config/db");
const isEmailTaken = async (queryEmail) => {
    const result = await db_1.db.query(`select email from users where email = '${queryEmail}'`);
    if (result?.length > 0) {
        return true;
    }
    return false;
};
exports.isEmailTaken = isEmailTaken;

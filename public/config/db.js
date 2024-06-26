"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const index_1 = require("../index");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
let client;
const db = {
    query: async function (query, params = []) {
        let client;
        try {
            client = await index_1.pool.connect();
            const res = await client.query(query, params);
            return res.rows;
        }
        catch (err) {
            console.error(err);
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Internal error");
        }
        finally {
            if (client)
                client.release();
        }
    },
    queryOne: async function (query, params = []) {
        let client;
        try {
            client = await index_1.pool.connect();
            const res = await client.query(query, params);
            return res.rows[0];
        }
        catch (err) {
            console.error(err);
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Internal error");
        }
        finally {
            if (client)
                client.release();
        }
    },
};
exports.db = db;

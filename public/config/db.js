"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = __importDefault(require("./config"));
const pool = new pg_1.Pool({
    connectionString: config_1.default.supabase.url,
});
const DB = {
    query: function (query, callback) {
        pool.connect((err, client, done) => {
            if (err)
                return callback(err);
            client.query(query, (err, results) => {
                done();
                if (err) {
                    console.error("ERROR: ", err);
                }
                if (err) {
                    return callback(err);
                }
                callback(null, results.rows);
            });
        });
    },
};

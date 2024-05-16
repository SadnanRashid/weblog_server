"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
const logger_1 = __importDefault(require("./config/logger"));
let server;
const pool = new pg_1.Pool({
    connectionString: config_1.default.supabase.url,
    idleTimeoutMillis: 30000,
});
// Connect to PostgreSQL
pool.connect((err, client, done) => {
    if (err) {
        logger_1.default.error("Error connecting to PostgreSQL:", err);
        process.exit(1); // Exit the process if connection fails
    }
    else {
        client === null || client === void 0 ? void 0 : client.release();
    }
    // If connection is successful
    logger_1.default.info("Connected to PostgreSQL");
    // Start your Express server
    server = app_1.default.listen(config_1.default.port, () => {
        logger_1.default.info(`Listening to port ${config_1.default.port}`);
    });
    // Handle cleanup when the server is closed
    server.on("close", () => {
        // Close the PostgreSQL connection pool
        pool.end((err) => {
            if (err) {
                logger_1.default.error("Error closing PostgreSQL connection pool:", err);
                process.exit(1); // Exit the process if closing connection fails
            }
            logger_1.default.info("PostgreSQL connection pool closed");
        });
    });
});
const exitHandler = (err) => {
    if (server) {
        server.close(() => {
            logger_1.default.info("Server closed");
            if (err) {
                logger_1.default.error(err);
                process.exit(1);
            }
            else {
                process.exit(0);
            }
        });
    }
    else {
        process.exit(0);
    }
};
const unexpectedErrorHandler = (error) => {
    logger_1.default.error(error);
    exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
    logger_1.default.info("SIGTERM received");
    if (server) {
        server.close();
    }
});

import { Pool } from "pg";
import app from "./app";
import config from "./config/config";
import logger from "./config/logger";
import { Server } from "http";

let server: Server;

const pool = new Pool({
  connectionString: config.supabase.url,
  idleTimeoutMillis: 30000,
});

// Connect to PostgreSQL
pool.connect((err, client, done) => {
  if (err) {
    logger.error("Error connecting to PostgreSQL:", err);
    process.exit(1); // Exit the process if connection fails
  } else {
    done();
  }
  // If connection is successful
  logger.info("Connected to PostgreSQL");

  // Start your Express server
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });

  // Handle cleanup when the server is closed
  server.on("close", () => {
    // Close the PostgreSQL connection pool
    pool.end((err?: Error) => {
      if (err) {
        logger.error("Error closing PostgreSQL connection pool:", err);
        process.exit(1); // Exit the process if closing connection fails
      }
      logger.info("PostgreSQL connection pool closed");
    });
  });
});

const exitHandler = (err?: Error) => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      if (err) {
        logger.error(err);
        process.exit(1);
      } else {
        process.exit(0);
      }
    });
  } else {
    process.exit(0);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

export { pool };

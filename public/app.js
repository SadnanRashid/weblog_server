"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
const config = require("./config/config");
const morgan = require("./config/morgan");
const { jwtStrategy } = require("./config/passport");
const { authLimiter } = require("./middlewares/rateLimiter");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError_1 = __importDefault(require("./utils/ApiError"));
const routes_1 = require("./routes");
const app = express();
if (config.env !== "test") {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}
// set security HTTP headers
app.use(helmet());
// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// sanitize request data
app.use(xss());
// gzip compression
// app.use(compression());
// enable cors
app.use(cors());
app.options("*", cors());
// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);
// limit repeated failed requests to auth endpoints
if (config.env === "production") {
    app.use("/v1/auth", authLimiter);
}
// v1 api routes
app.use("/v1", routes_1.router);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError_1.default(httpStatus.NOT_FOUND, "Not found"));
});
// convert error to ApiError, if needed
app.use(errorConverter);
// handle error
app.use(errorHandler);
exports.default = app;

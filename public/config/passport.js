"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const config_1 = __importDefault(require("./config"));
const token_1 = require("./token");
const db_1 = require("./db");
const jwtOptions = {
    secretOrKey: config_1.default.jwt.secret,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const jwtVerify = async (payload, done) => {
    try {
        if (payload.type !== token_1.tokenTypes.ACCESS) {
            throw new Error("Invalid token type");
        }
        const user = await db_1.db.queryOne(`SELECT * FROM users WHERE user_id = '${payload.sub}'`);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
};
const jwtStrategy = new passport_jwt_1.Strategy(jwtOptions, jwtVerify);
exports.jwtStrategy = jwtStrategy;

// import {
//   Strategy as JwtStrategy,
//   ExtractJwt,
//   StrategyOptions,
// } from "passport-jwt";
// import config from "./config";
// import { tokenTypes } from "./tokens";
// import { User } from "../models";
// import { Request } from "express";

// interface Payload {
//   type: string;
//   sub: string;
// }

// const jwtOptions: StrategyOptions = {
//   secretOrKey: config.jwt.secret,
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// };

// const jwtVerify = async (
//   payload: Payload,
//   done: (error: any, user?: any) => void
// ) => {
//   try {
//     if (payload.type !== tokenTypes.ACCESS) {
//       throw new Error("Invalid token type");
//     }
//     const user = await User.findById(payload.sub);
//     if (!user) {
//       return done(null, false);
//     }
//     done(null, user);
//   } catch (error) {
//     done(error, false);
//   }
// };

// const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

// export { jwtStrategy };

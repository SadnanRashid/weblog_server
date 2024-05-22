import express from "express";
import { DefaultRouteType } from "../types/Routes.type";
import userRouter from "./users.route";
import authRouter from "../controllers/auth.route";

const router = express.Router();

const defaultRoutes: DefaultRouteType[] = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
];

defaultRoutes.forEach((route: DefaultRouteType) => {
  router.use(route.path, route.route);
});

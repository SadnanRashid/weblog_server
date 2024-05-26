import express from "express";
import { DefaultRouteType } from "../types/Routes.type";
import userRouter from "./users.route";
import authRouter from "./auth.route";
import blogsRouter from "./blogs.route";

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
  {
    path: "/blogs",
    route: blogsRouter,
  },
];

defaultRoutes.forEach((route: DefaultRouteType) => {
  router.use(route.path, route.route);
});

export { router };

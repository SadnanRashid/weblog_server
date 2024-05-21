import { Router } from "express";
import { IRouter } from "express";

type DefaultRouteType = {
  path: string;
  route: IRouter;
};

type DefaultRoutesType = DefaultRouteType[];

export { DefaultRoutesType, DefaultRouteType };

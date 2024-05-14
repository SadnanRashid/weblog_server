import { Router } from "express";

type DefaultRouteType = {
  path: string;
  route: string;
};

type DefaultRoutesType = DefaultRouteType[];

export { DefaultRoutesType, DefaultRouteType };

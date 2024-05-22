"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_route_1 = __importDefault(require("./users.route"));
const auth_route_1 = __importDefault(require("../controllers/auth.route"));
const router = express_1.default.Router();
const defaultRoutes = [
    {
        path: "/users",
        route: users_route_1.default,
    },
    {
        path: "/auth",
        route: auth_route_1.default,
    },
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

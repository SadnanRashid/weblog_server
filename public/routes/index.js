"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const users_route_1 = __importDefault(require("./users.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const blogs_route_1 = __importDefault(require("./blogs.route"));
const router = express_1.default.Router();
exports.router = router;
const defaultRoutes = [
    {
        path: "/users",
        route: users_route_1.default,
    },
    {
        path: "/auth",
        route: auth_route_1.default,
    },
    {
        path: "/blogs",
        route: blogs_route_1.default,
    },
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

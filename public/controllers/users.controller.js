"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const users_service_1 = require("../services/users.service");
const getUser = (0, catchAsync_1.default)(async (req, res) => {
    const user = await users_service_1.userService.getUser(req.params.uid);
    res.send(user);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savesController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const saves_service_1 = require("../services/saves.service");
const saveBlog = (0, catchAsync_1.default)(async (req, res) => {
    const { user_id, blog_id } = req.body;
    const result = await saves_service_1.savesService.saveBlog(blog_id, user_id);
    res.status(http_status_1.default.CREATED).send("Blog saved");
});
exports.savesController = { saveBlog };

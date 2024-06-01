"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogs_controller_1 = require("../controllers/blogs.controller");
const blogsRouter = express_1.default.Router();
blogsRouter.get("/get/trending", blogs_controller_1.blogsController.trendingBlogs);
blogsRouter.get("/get/paginate", blogs_controller_1.blogsController.paginateBlogs);
blogsRouter.get("/get/comments/:id", blogs_controller_1.blogsController.getBlogComments);
blogsRouter.get("/get/:id", blogs_controller_1.blogsController.getBlog);
blogsRouter.post("/post", blogs_controller_1.blogsController.createBlog);
blogsRouter.post("/post/comment", blogs_controller_1.blogsController.postBlogComment);
exports.default = blogsRouter;

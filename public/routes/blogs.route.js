"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const blogs_controller_1 = require("../controllers/blogs.controller");
const saves_controller_1 = require("../controllers/saves.controller");
const blogs_validation_1 = require("../validations/blogs.validation");
const blogsRouter = express_1.default.Router();
blogsRouter.get("/get/trending", blogs_controller_1.blogsController.trendingBlogs);
blogsRouter.get("/get/paginate", blogs_controller_1.blogsController.paginateBlogs);
blogsRouter.get("/get/comments/:id", blogs_controller_1.blogsController.getBlogComments);
blogsRouter.get("/get/:id", blogs_controller_1.blogsController.getBlog);
blogsRouter.post("/post", (0, validate_1.default)(blogs_validation_1.blogValidation.blogPost), blogs_controller_1.blogsController.createBlog);
blogsRouter.post("/post/comment", (0, validate_1.default)(blogs_validation_1.blogValidation.blogComment), blogs_controller_1.blogsController.postBlogComment);
blogsRouter.post("/post/save", (0, validate_1.default)(blogs_validation_1.blogValidation.blogSave), saves_controller_1.savesController.saveBlog);
exports.default = blogsRouter;

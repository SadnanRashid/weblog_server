"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsController = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const blogs_service_1 = require("../services/blogs.service");
const paginator_1 = require("../middlewares/paginator");
const getBlog = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const blog = await blogs_service_1.blogService.getBlog(id);
    res.send(blog);
});
const createBlog = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const blog = await blogs_service_1.blogService.createBlog(data);
    res.send(blog);
});
const trendingBlogs = (0, catchAsync_1.default)(async (req, res) => {
    const blogs = await blogs_service_1.blogService.trendingBlogs();
    res.send(blogs);
});
const paginateBlogs = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, skip } = (0, paginator_1.paginator)(req.query);
    console.log(limit, skip);
    const blogs = await blogs_service_1.blogService.paginateBlogs(limit, skip);
    res.send(blogs);
});
const getBlogComments = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const comments = await blogs_service_1.blogService.getBlogComments(id);
    res.send(comments);
});
const postBlogComment = (0, catchAsync_1.default)(async (req, res) => {
    const { blog_id, body, user_id } = req.body;
    const comment = await blogs_service_1.blogService.postBlogComment(blog_id, body, user_id);
    return comment;
});
exports.blogsController = {
    createBlog,
    getBlog,
    trendingBlogs,
    paginateBlogs,
    getBlogComments,
    postBlogComment,
};

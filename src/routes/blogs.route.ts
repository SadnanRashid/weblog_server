import express from "express";
import validate from "../middlewares/validate";
import { blogsController } from "../controllers/blogs.controller";

const blogsRouter = express.Router();

blogsRouter.get("/get/trending", blogsController.trendingBlogs);
blogsRouter.get("/get/paginate", blogsController.paginateBlogs);
blogsRouter.get("/get/comments", blogsController.getBlogComments);
blogsRouter.get("/get/:id", blogsController.getBlog);
blogsRouter.post("/post", blogsController.createBlog);
blogsRouter.post("/post/comment", blogsController.postBlogComment);

export default blogsRouter;

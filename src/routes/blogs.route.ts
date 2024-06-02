import express from "express";
import validate from "../middlewares/validate";
import { blogsController } from "../controllers/blogs.controller";
import { savesController } from "../controllers/saves.controller";

const blogsRouter = express.Router();

blogsRouter.get("/get/trending", blogsController.trendingBlogs);
blogsRouter.get("/get/paginate", blogsController.paginateBlogs);
blogsRouter.get("/get/comments/:id", blogsController.getBlogComments);
blogsRouter.get("/get/:id", blogsController.getBlog);
blogsRouter.post("/post", blogsController.createBlog);
blogsRouter.post("/post/comment", blogsController.postBlogComment);
blogsRouter.post("/post/save", savesController.saveBlog);

export default blogsRouter;

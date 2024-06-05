import express from "express";
import validate from "../middlewares/validate";
import { blogsController } from "../controllers/blogs.controller";
import { savesController } from "../controllers/saves.controller";
import { blogValidation } from "../validations/blogs.validation";

const blogsRouter = express.Router();

blogsRouter.get("/get/trending", blogsController.trendingBlogs);
blogsRouter.get("/get/paginate", blogsController.paginateBlogs);
blogsRouter.get("/get/comments/:id", blogsController.getBlogComments);
blogsRouter.get("/get/:id", blogsController.getBlog);
blogsRouter.post(
  "/post",
  validate(blogValidation.blogPost),
  blogsController.createBlog
);
blogsRouter.post(
  "/post/comment",
  validate(blogValidation.blogComment),
  blogsController.postBlogComment
);
blogsRouter.post(
  "/post/save",
  validate(blogValidation.blogSave),
  savesController.saveBlog
);

export default blogsRouter;

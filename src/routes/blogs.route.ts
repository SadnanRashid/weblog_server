import express from "express";
import validate from "../middlewares/validate";
import { blogsController } from "../controllers/blogs.controller";

const blogsRouter = express.Router();

blogsRouter.get("/get/:id", blogsController.getBlog);
blogsRouter.post("/post", blogsController.createBlog);

export default blogsRouter;
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { blogService } from "../services/blogs.service";

const getBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const blog = await blogService.getBlog(id);
  res.send(blog);
});

const createBlog = catchAsync(async (req, res) => {
  const data = req.body;
  const blog = await blogService.createBlog(data);
  res.send(blog);
});

export const blogsController = {
  createBlog,
  getBlog,
};

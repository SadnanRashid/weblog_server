import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { blogService } from "../services/blogs.service";

const getBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const blog = await blogService.getBlog(id);
  return blog;
});

const createBlog = catchAsync(async (req, res) => {
  const data = req.body;
  const blog = await blogService.createBlog(data);
  return blog;
});

export const blogsController = {
  createBlog,
  getBlog,
};

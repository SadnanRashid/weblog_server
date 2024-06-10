import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { blogService } from "../services/blogs.service";
import { paginator } from "../middlewares/paginator";

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

const trendingBlogs = catchAsync(async (req, res) => {
  const blogs = await blogService.trendingBlogs();
  res.send(blogs);
});

const paginateBlogs = catchAsync(async (req, res) => {
  const { limit, skip } = paginator(
    req.query as { page: string; limit: string }
  );
  console.log(limit, skip);
  const blogs = await blogService.paginateBlogs(limit, skip);
  res.send(blogs);
});

const getBlogComments = catchAsync(async (req, res) => {
  const id: string = req.params.id;
  console.log(id);
  const comments = await blogService.getBlogComments(id);
  res.send(comments);
});

const postBlogComment = catchAsync(async (req, res) => {
  const { blog_id, body, user_id } = req.body;
  const comment = await blogService.postBlogComment(blog_id, body, user_id);
  res.send(comment); 
});

export const blogsController = {
  createBlog,
  getBlog,
  trendingBlogs,
  paginateBlogs,
  getBlogComments,
  postBlogComment,
};

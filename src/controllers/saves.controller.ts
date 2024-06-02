import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { savesService } from "../services/saves.service";

const saveBlog = catchAsync(async (req, res) => {
  const { user_id, blog_id } = req.body;
  const result = await savesService.saveBlog(blog_id, user_id);
  res.status(httpStatus.CREATED).send(result);
});

export const savesController = { saveBlog };

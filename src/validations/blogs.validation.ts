import Joi from "joi";

const blogPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    category: Joi.string().required(),
    body: Joi.string().required(),
    user_id: Joi.string().required(),
  }),
};

const blogComment = {
  body: Joi.object().keys({
    blog_id: Joi.string().required(),
    body: Joi.string().required(),
    user_id: Joi.string().required(),
  }),
};

const blogSave = {
  body: Joi.object().keys({
    blog_id: Joi.string().required(),
    user_id: Joi.string().required(),
  }),
};

export const blogValidation = {
  blogPost,
  blogComment,
  blogSave,
};

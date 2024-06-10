"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const blogPost = {
    body: joi_1.default.object().keys({
        title: joi_1.default.string().required(),
        tags: joi_1.default.array().items(joi_1.default.string()).required(),
        category: joi_1.default.string().required(),
        body: joi_1.default.string().required(),
        user_id: joi_1.default.string().required(),
    }),
};
const blogComment = {
    body: joi_1.default.object().keys({
        blog_id: joi_1.default.string().required(),
        body: joi_1.default.string().required(),
        user_id: joi_1.default.string().required(),
    }),
};
const blogSave = {
    body: joi_1.default.object().keys({
        blog_id: joi_1.default.string().required(),
        user_id: joi_1.default.string().required(),
    }),
};
exports.blogValidation = {
    blogPost,
    blogComment,
    blogSave,
};

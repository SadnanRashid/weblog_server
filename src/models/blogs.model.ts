type TBlogs = {
  blog_id?: string;
  title: string;
  body: object[]; // Adjust this later
  category: string;
  tags: string[];
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
};

type TFullBlogPost = TBlogs & {
  user_id: string;
  name: string;
  viewcount: number;
};

type TComment = {
  comment_id: string;
  body: string;
  user_id: string;
  blog_id: string;
  created_at?: Date;
};

type TBlogView = {
  view_id: string;
  blog_id: string;
  view_datetime: Date;
};

export { TBlogs, TBlogView, TFullBlogPost, TComment };

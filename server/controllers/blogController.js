import { setupModels } from '../database/mongooseModels.js';

let Post;

async function getPostModel() {
  if (!Post) {
    const models = await setupModels(); // import this from mongoDB.js
    Post = models.Post;
  }
  return Post;
}

export const getAllPosts = async (req, res, next) => {
  try {
    const PostModel = await getPostModel();
    const foundPosts = await PostModel.find();

    res.render('blog-home', { posts: foundPosts });
  } catch (err) {
    next(err);
  }
};

export const renderComposePage = (req, res) => {
  res.render('blog-compose', { isEditing: false, post: null });
};

export const createPost = async (req, res, next) => {
  try {
    const { postTitle: title, postBody: content } = req.body;
    const post = new (await getPostModel())({ title, content });
    await post.save();
    res.redirect('/blog/home');
  } catch (err) {
    next(err);
  }
};

export const getSinglePost = async (req, res, next) => {
  try {
    const Post = await getPostModel();
    const foundPost = await Post.findOne({ _id: req.params.postId });
    if (foundPost) res.render('blog-post', { post: foundPost });
    else res.status(404).send('Post not found');
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const Post = await getPostModel();
    await Post.deleteOne({ _id: req.params.postId });
    res.redirect('/blog/home');
  } catch (err) {
    next(err);
  }
};

export const editPost = async (req, res, next) => {
  try {
    const Post = await getPostModel();
    const foundPost = await Post.findOne({ _id: req.params.postId });
    if (foundPost)
      res.render('blog-compose', { post: foundPost, isEditing: true });
    else res.status(404).send('Post not found');
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const Post = await getPostModel();
    const { postTitle: title, postBody: content } = req.body;
    await Post.updateOne({ _id: req.params.postId }, { title, content });
    res.redirect('/blog/home');
  } catch (err) {
    next(err);
  }
};

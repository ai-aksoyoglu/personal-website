import express from 'express';
import {
  getAllPosts,
  renderComposePage,
  createPost,
  getSinglePost,
  deletePost,
  editPost,
  updatePost,
} from '../controllers/blogController.js';

const blog = express.Router();

blog.get('/home', getAllPosts);
blog.get('/compose', renderComposePage);
blog.post('/compose', createPost);
blog.get('/:postId', getSinglePost);
blog.post('/:postId/delete', deletePost);
blog.get('/:postId/edit', editPost);
blog.post('/:postId/update', updatePost);

export default blog;

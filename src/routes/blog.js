import express from 'express';

import { Post } from '../../server/helpers/models/mongoDB.js';

const { Router } = express;
const blog = Router();

blog.get('/home', async (req, res) => {
  try {
    const foundPosts = await Post.find();
    res.render('blog-home', {
      posts: foundPosts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

blog.get('/compose', (req, res) =>
  res.render('blog-compose', { isEditing: false, post: null })
);

blog.post('/compose', async (req, res) => {
  try {
    const { postTitle: title, postBody: content } = req.body;
    const post = new Post({ title, content });
    await post.save();
    res.redirect('/blog/home');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

blog.get('/:postId', async (req, res) => {
  try {
    const foundPost = await Post.findOne({ _id: req.params.postId });
    if (foundPost) res.render('blog-post', { post: foundPost });
    else res.status(404).send('Post not found');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

blog.post('/:postId/delete', async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.postId });
    res.redirect('/blog/home');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

blog.get('/:postId/edit', async (req, res) => {
  try {
    const foundPost = await Post.findOne({ _id: req.params.postId });
    if (foundPost)
      res.render('blog-compose', { post: foundPost, isEditing: true });
    else res.status(404).send('Post not found');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

blog.post('/:postId/update', async (req, res) => {
  try {
    const { postTitle: title, postBody: content } = req.body;
    await Post.updateOne({ _id: req.params.postId }, { title, content });
    res.redirect('/blog/home');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

export default blog;
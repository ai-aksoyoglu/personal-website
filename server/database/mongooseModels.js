import mongoose from 'mongoose';
import { ConnectionManager } from './index.js';

// Schema Definitions
const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  items: [
    {
      name: {
        type: String,
        required: [true, 'Item name is required.'],
      },
    },
  ],
});

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  content: {
    type: String,
    required: [true, 'Content is required.'],
  },
});

let List, Post;

export async function setupModels() {
  try {
    // Set up the models for each DB connection. Don't change this. If you do const { getBlogConnection, getTodoConnection } = ConnectionManager; you get an error
    const blogConnection = ConnectionManager.getBlogConnection();
    const todoConnection = ConnectionManager.getTodoConnection();

    Post = blogConnection.model('Post', postsSchema);
    List = todoConnection.model('List', listSchema);

    return { Post, List };
  } catch (error) {
    console.error('Error setting up the models:', error);
    throw error; // Throw the error so it can be caught by a higher-level error handler, if needed.
  }
}

export { List, Post };

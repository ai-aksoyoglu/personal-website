import mongoose from 'mongoose';
import { blogDBconnPromise, todoDBconnPromise } from '../mongoConnection.js';

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

async function setupModels() {
  try {
    // Setting up the model for the blogDB
    const blogDBconn = await blogDBconnPromise;
    Post = blogDBconn.model('Post', postsSchema);

    // Setting up the model for the todoDB
    const todoDBconn = await todoDBconnPromise;
    List = todoDBconn.model('List', listSchema);

    return { Post, List };
  } catch (error) {
    console.error('Error setting up the models:', error);
    throw error; // Throw the error so it can be caught by a higher-level error handler, if needed.
  }
}

setupModels().catch((error) => {
  console.error('Failed to setup models:', error);
});

export { List, Post };

// Usage:
// const todayList = new List({
//   name: 'Today',
//   items: [
//     { name: 'Buy Food' },
//     { name: 'Cook' },
//     { name: 'Eat 🎉' }
//   ]
// });

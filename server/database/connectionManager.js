import mongoose from 'mongoose';
import config from '../../config.js';

const formatDatabaseURL = (dbName) => {
  const { MONGODB_PROTOCOL, MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST } =
    config;

  return `${MONGODB_PROTOCOL}${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${dbName}`;
};

class ConnectionManager {
  constructor() {
    this.blogDBconn = null;
    this.todoDBconn = null;
  }

  async connect() {
    try {
      this.blogDBconn = await this.createConnection(config.MONGODB_BLOG_DB);
      this.todoDBconn = await this.createConnection(config.MONGODB_TODO_DB);
    } catch (error) {
      console.error(
        `Error connecting to MongoDB. Error message: ${error.message}`
      );
      process.exit(1);
    }
  }

  async createConnection(databaseName) {
    const formattedURI = formatDatabaseURL(databaseName);
    const connection = await mongoose.createConnection(formattedURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    });
    connection.set('strictQuery', false);
    console.log(`Connected to MongoDB database: ${databaseName}`);
    return connection;
  }

  getBlogConnection() {
    return this.blogDBconn;
  }

  getTodoConnection() {
    return this.todoDBconn;
  }

  async close() {
    if (this.blogDBconn) await this.blogDBconn.close();
    if (this.todoDBconn) await this.todoDBconn.close();
  }
}

export default new ConnectionManager();

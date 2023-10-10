import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Helper function to format the database URL
const formatDatabaseURL = (dbName) => {
  const { MONGODB_PROTOCOL, MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_HOST } =
    process.env;

  return `${MONGODB_PROTOCOL}${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${dbName}`;
};

const createDatabaseConnection = async (databaseName) => {
  const formattedURI = formatDatabaseURL(databaseName);

  try {
    const connection = await mongoose.createConnection(formattedURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    });

    // Set configurations for the individual connection
    connection.set('strictQuery', false);

    console.log(`Connected to MongoDB database: ${databaseName}`);
    return connection;
  } catch (error) {
    console.error(
      `MongoDB connection error for database: ${databaseName}. Error message: ${error.message}`
    );
    process.exit(1);
  }
};

export const blogDBconnPromise = createDatabaseConnection(
  process.env.MONGODB_BLOG_DB
);
export const todoDBconnPromise = createDatabaseConnection(
  process.env.MONGODB_TODO_DB
);

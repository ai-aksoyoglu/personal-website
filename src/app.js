import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import favicon from 'serve-favicon';
import path from 'path';
import { fileURLToPath } from 'url';

// Local imports
import { runInitialization, errorHandler } from './helpers/index.js';
import {
  homepage,
  blog,
  bmi,
  contact,
  dice,
  drums,
  newsletter,
  simon,
  today,
  weather,
  work,
} from './routes/index.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const formatDatabaseURL = (baseURL, dbName) => {
  const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;
  return (
    baseURL.replace('@', `${MONGODB_USERNAME}:${MONGODB_PASSWORD}@`) + dbName
  );
};

const connectToDatabase = async (databaseName) => {
  const formattedURI = formatDatabaseURL(
    process.env.MONGODB_BASE_URL,
    databaseName
  );

  mongoose.set('strictQuery', false);
  mongoose.set('bufferCommands', false);

  try {
    await mongoose.connect(formattedURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB at ${formattedURI}`);
  } catch (error) {
    console.error(
      `MongoDB connection error at ${formattedURI}: ${error.message}`
    );
    process.exit(1);
  }
};

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));

app.use('/', homepage);
app.use('/blog', blog);
app.use('/bmi', bmi);
app.use('/contact', contact);
app.use('/dice', dice);
app.use('/drums', drums);
app.use('/newsletter', newsletter);
app.use('/simon', simon);
app.use('/todo/today', today);
app.use('/todo/work', work);
app.use('/weather', weather);

app.use((req, res, next) => {
  const err = new Error('Page not found!');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToDatabase(process.env.MONGODB_TODO_DB);
    runInitialization();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, function () {
      console.log(`Server started running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error in starting the server: ${error.message}`);
    process.exit(1);
  }
};

startServer();

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  mongoose.connection.close(() => {
    console.log(
      'Mongoose connection has been terminated because an unhandled promise rejection was detected.'
    );
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection closed due to app termination.');
    process.exit(0);
  });
});

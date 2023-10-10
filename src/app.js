import dotenv from 'dotenv';
import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import { fileURLToPath } from 'url';

// Local imports
import {
  blogDBconnPromise,
  todoDBconnPromise,
  errorHandler,
} from '../server/helpers/index.js';
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

let blogDBconn, todoDBconn;

dotenv.config();
// Check for essential environment variables
if (!process.env.MONGODB_BLOG_DB || !process.env.MONGODB_TODO_DB) {
  console.error('Database URLs not provided in environment.');
  process.exit(1);
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// 404 handler middleware
app.use((req, res, next) => {
  const err = new Error('Page not found!');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

const startServer = async () => {
  try {
    // Use Promise.all to ensure that both connections are established before moving on
    [blogDBconn, todoDBconn] = await Promise.all([
      blogDBconnPromise,
      todoDBconnPromise,
    ]);

    // runInitialization();

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

function gracefullyExit() {
  console.log('Attempting to close Mongoose connections...');

  blogDBconn.close();
  todoDBconn.close(() => {
    console.log('Mongoose connections closed.');
    process.exit(0);
  });
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefullyExit();
});

process.on('SIGINT', gracefullyExit);

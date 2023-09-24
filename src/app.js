import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { runInitialization } from './helpers/index.js';
import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from './helpers/index.js';
import {
  homepage,
  about,
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
const { mongoDB_username, mongoDB_password } = process.env;
mongoose.connect(
  `mongodb+srv://${mongoDB_username}:${mongoDB_password}@cluster0.jrfbq.mongodb.net/todolistDB`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
runInitialization();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const publicDir = path.join(__dirname, '..', 'public'); // Move up to the parent directory
app.use(favicon(path.join(publicDir, 'favicon.ico')));

app.set('view engine', 'ejs');

app.use('/', homepage);
app.use('/about', about);
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
  // Create a 404 error object and pass it to the next middleware (errorHandler)
  const err = new Error('Page not found!');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(process.env.PORT || 3000, function () {
  console.log('Server started running on port ' + process.env.PORT);
});

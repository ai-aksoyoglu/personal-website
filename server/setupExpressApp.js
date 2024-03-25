import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import config from '../config.js';

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

import { errorHandler } from './helpers/errorHandler.js';

const setupExpressApp = (app) => {
  app.set('view engine', 'ejs');
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(config.PUBLIC_DIRECTORY));
  app.use(favicon(path.join(config.PUBLIC_DIRECTORY, 'favicon.ico')));

  app.use(morgan('dev'));
  app.use(helmet.hidePoweredBy());
  app.use(
    helmet.hsts({
      maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
      includeSubDomains: true,
      preload: true,
    })
  );

  // Routes
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
    const err = new Error(`Page not found for ${req.method} ${req.url}`);
    err.status = 404;
    next(err);
  });

  // Centralized error handler
  app.use(errorHandler);
};

export default setupExpressApp;

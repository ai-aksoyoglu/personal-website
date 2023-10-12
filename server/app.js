import express from 'express';
import config from '../config.js';
import ConnectionManager from './database/connectionManager.js';
import { setupModels } from './database/mongooseModels.js';
import setupExpressApp from './setupExpressApp.js';

const app = express();

setupExpressApp(app);

const startServer = async () => {
  try {
    await ConnectionManager.connect();
    await setupModels();

    // Handle what happens if there is no todoList --> defaultItems

    app.listen(config.PORT, function () {
      console.log(`Server started running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error(`Error in starting the server: ${error.message}`);
    process.exit(1);
  }
};

startServer();

function gracefullyExit() {
  console.log('Attempting to close Mongoose connections...');

  ConnectionManager.close().then(() => {
    console.log('Mongoose connections closed.');
    process.exit(0);
  });
}

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefullyExit();
});

process.on('SIGINT', gracefullyExit);

import express from 'express';
import * as drumsController from '../controllers/drumsController.js';

const drums = express.Router();

drums.get('/', drumsController.renderDrumsPage);

export default drums;

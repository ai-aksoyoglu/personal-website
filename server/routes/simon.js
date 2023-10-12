import express from 'express';
import * as simonController from '../controllers/simonController.js';

const simon = express.Router();

simon.get('/', simonController.renderSimonPage);

export default simon;

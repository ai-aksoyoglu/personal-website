import express from 'express';
import * as homepageController from '../controllers/homepageController.js';

const homepage = express.Router();

homepage.get('/', homepageController.renderHomepage);

export default homepage;

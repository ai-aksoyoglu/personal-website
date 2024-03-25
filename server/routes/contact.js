import express from 'express';
import * as contactController from '../controllers/contactController.js';

const contact = express.Router();

contact.get('/', contactController.renderContactPage);

export default contact;

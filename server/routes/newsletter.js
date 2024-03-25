import express from 'express';
import * as newsletterController from '../controllers/newsletterController.js';

const newsletter = express.Router();

newsletter.get('/signup', newsletterController.renderSignupPage);
newsletter.post('/signup', newsletterController.postSignup);
newsletter.get('/success', newsletterController.renderSuccessPage);
newsletter.get('/failure', newsletterController.renderFailurePage);

export default newsletter;

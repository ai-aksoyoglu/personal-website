import express from 'express';
import * as bmiController from '../controllers/bmiController.js';

const bmi = express.Router();

bmi.get('/', bmiController.renderBmiPage);

bmi.post('/', bmiController.calculateBmi);

export default bmi;

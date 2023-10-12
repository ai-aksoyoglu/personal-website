import express from 'express';
import * as diceController from '../controllers/diceController.js';

const dice = express.Router();

dice.get('/', diceController.renderDicePage);

export default dice;

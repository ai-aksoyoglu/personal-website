import express from 'express';
import * as weatherController from '../controllers/weatherController.js';

const weather = express.Router();

weather.get('/', weatherController.renderWeatherPage);
weather.post('/', weatherController.getWeather);

export default weather;

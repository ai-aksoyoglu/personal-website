import { get } from 'https';

export const renderWeatherPage = (req, res) => res.render('weather');

export const getWeather = (req, res) => {
  const query = req.body.cityName;
  const apiKey = 'bbfc773fa75427fe40a14807a7863b2a'; // Consider storing API keys in environment variables for security!
  const units = 'metric';
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    query +
    '&appid=' +
    apiKey +
    '&units=' +
    units;

  get(url, (response) => {
    console.log('statusCode:', response.statusCode);
    console.log('headers:', response.headers);

    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

      // Render the weather.ejs view and pass the data to it
      res.render('weather', {
        weatherDescription: weatherDescription,
        imageURL: imageURL,
        cityName: req.body.cityName,
        temp: temp,
      });
    });
  }).on('error', (e) => {
    console.error(e);
  });
};

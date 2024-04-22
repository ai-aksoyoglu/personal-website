import { get } from 'https';

export const renderWeatherPage = (req, res) => res.render('weather');

export const getWeather = (req, res, next) => {
  const query = req.body.cityName;
  const apiKey = 'bbfc773fa75427fe40a14807a7863b2a'; // Consider storing API keys in environment variables for security!
  const units = 'metric';
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    encodeURIComponent(query) +
    '&appid=' +
    apiKey +
    '&units=' +
    units;

  get(url, (response) => {
    console.log('statusCode:', response.statusCode);
    console.log('headers:', response.headers);

    let dataChunks = [];
    response.on('data', (chunk) => {
      dataChunks.push(chunk);
    });

    response.on('end', () => {
      const weatherData = JSON.parse(Buffer.concat(dataChunks).toString());

      if (response.statusCode === 200) {
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

        // Render the weather.ejs view and pass the data to it
        res.render('weather', {
          weatherDescription: weatherDescription,
          imageURL: imageURL,
          cityName: query,
          temp: temp,
        });
      } else {
        // Create an error object and set its status to the response status code
        const error = new Error('City not found or other error');
        error.status = response.statusCode;
        next(error); // Pass the error to the next middleware (error handler)
      }
    });
  }).on('error', (e) => {
    console.error(e);
    const error = new Error('An error occurred while retrieving weather data.');
    error.status = 500;
    next(error); // Pass the error to the next middleware (error handler)
  });
};

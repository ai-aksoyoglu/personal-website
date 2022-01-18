const express = require('express');
const https = require('https');
const app = express();

app.get('/', function (req, res) {
  res.send(
    'Hello. Would you like to know the weather forcast? Check out http://localhost:3000/weather'
  );
});

app.get('/weather', function (req, res) {
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=Berlin&callback=test&appid=bbfc773fa75427fe40a14807a7863b2a&units=metric';
  https
    .get(url, (response) => {
      console.log('statusCode:', response.statusCode);
      console.log('headers:', response.headers);

      response.on('data', (d) => {
        process.stdout.write(d);
      });
    })
    .on('error', (e) => {
      console.error(e);
    });

  res.send('<h1>Weather App</h1>');
});

app.listen(3000, function () {
  console.log('Server started running on port 3000');
});

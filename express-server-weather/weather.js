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
    'https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=bbfc773fa75427fe40a14807a7863b2a&units=metric';
  https
    .get(url, (response) => {
      console.log('statusCode:', response.statusCode);
      console.log('headers:', response.headers);

      response.on('data', function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

        res.write(
          '<p>The weather is currently ' +
            weatherDescription +
            '. </p><img src=' +
            imageURL +
            '>'
        );
        res.write(
          '<h1>The temperature in Berlin is now ' +
            temp +
            ' degrees Celcius.</h1>'
        );
        res.send();
      });
    })
    .on('error', (e) => {
      console.error(e);
    });

  /*res.sendFile(__dirname + '/weather.html');*/
});

app.listen(3000, function () {
  console.log('Server started running on port 3000');
});

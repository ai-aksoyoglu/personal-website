const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');

const mailchimp = require('@mailchimp/mailchimp_marketing');
mailchimp.setConfig({
  apiKey: 'd811cff0f13135db37c4bf37fd4e3b89-us20',
  server: 'us20',
});
/*check if mailchimp works successfully (api call)
async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}
run();*/

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Server started running on port 3000');
});

app.get('/', function (req, res) {
  res.send(
    'Hello. Would you like to know the weather forcast? Check out http://localhost:3000/weather<br>Would you like to calculate your BMI? Check out https://localhost:3000/bmi'
  );
});

/*__dirname = /home/alexandra/Desktop/_Web Development_/personal-website
 */

app.get('/bmi', function (req, res) {
  res.sendFile(__dirname + '/bmi.html');
});

app.post('/bmi', function (req, res) {
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  var result = weight / (height * height);
  res.send('<h1>The corresponding BMI is ' + result.toFixed(2) + '.</h1>');
});

app.get('/weather', function (req, res) {
  res.sendFile(__dirname + '/weather.html');
});

app.post('/weather', function (req, res) {
  const query = req.body.cityName;
  const apiKey = 'bbfc773fa75427fe40a14807a7863b2a';
  const units = 'metric';
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    query +
    '&appid=' +
    apiKey +
    '&units=' +
    units;
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
          '<h1>The temperature in ' +
            req.body.cityName +
            ' is now ' +
            temp +
            ' degrees Celcius.</h1>'
        );
        res.send();
      });
    })
    .on('error', (e) => {
      console.error(e);
    });
});

app.get('/newsletter-signup', function (req, res) {
  res.sendFile(__dirname + '/newsletter-signup.html');
});

app.post('/newsletter-signup', function (req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  res.send(
    '<h1>Your name is ' +
      firstName +
      ' ' +
      lastName +
      ' and your email address is ' +
      email +
      '. Thank you for signing up for the newsletter service.</h1>'
  );
});

//API Key (mailchimp)
//d811cff0f13135db37c4bf37fd4e3b89-us20

//AudienceID (mailchimp)
//cbf7b19400

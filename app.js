const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');
const date = require(__dirname + '/date.js');

const mailchimp = require('@mailchimp/mailchimp_marketing');
mailchimp.setConfig({
  apiKey: '',
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

app.set('view engine', 'ejs');
let items = ['Buy food', 'Cook', 'Eat :-)'];
let workItems = [];

app.listen(process.env.PORT || 3000, function () {
  console.log('Server started running on port 3000');
});

app.get('/', function (req, res) {
  res.render('about');
});

/*__dirname = /home/alexandra/Desktop/_Web Development_/personal-website*/

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
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  const listId = '';

  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });

    //If all goes well logging the contact's id
    res.sendFile(__dirname + '/newsletter-success.html');
    console.log(
      "Successfully added contact as an audience member. The contact's id is" +
        response.id +
        '.'
    );
  }

  //Running the function and catching the errors (if any)
  // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
  // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
  run().catch((e) => res.sendFile(__dirname + '/newsletter-failure.html'));
});

app.post('/newsletter-failure', function (req, res) {
  res.redirect('/newsletter-signup');
});

/*const url = "https://us20.api.mailchimp.com/3.0/lists/" + list_id;

  const options = {
    method: "POST",
    auth: "ai.aksoyoglu:",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  const jsonData = JSON.stringify(subscribingUser);

  request.write(jsonData);
  request.end;

  res.send(
    "<h1>Your name is " +
      firstName +
      " " +
      lastName +
      " and your email address is " +
      email +
      ". Thank you for signing up for the newsletter service.</h1>"
  );
});*/

app.get('/todolist', function (req, res) {
  let day = date();
  res.render('list', { listTitle: day, newListItems: items });
});

app.post('/todolist', function (req, res) {
  let item = req.body.newItem;

  if (req.body.list === 'Work') {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/todolist');
  }
});

app.get('/work', function (req, res) {
  res.render('list', { listTitle: 'Work List', newListItems: workItems });
});

app.post('/work', function (req, res) {
  let item = req.body;
  workItems.push(item);
  res.redirect('/work');
});

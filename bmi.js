const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

/*__dirname = /home/alexandra/Desktop/_Web Development_/personal-website
 */

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/bmi.html');
});

app.post('/', function (req, res) {
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  var result = weight / (height * height);
  res.send('The corresponding BMI is ' + result.toFixed(2) + '.');
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});

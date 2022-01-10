const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello');
});

app.get('/calculator', function (req, res) {
  res.send('<h1>Calculator</h1>');
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});

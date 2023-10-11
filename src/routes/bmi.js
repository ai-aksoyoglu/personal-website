import express from 'express';

const { Router } = express;
const bmi = Router();

bmi.get('/', (req, res) => res.render('bmi'));

bmi.post('/', function (req, res) {
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  var result = weight / (height * height);
  res.send('<h1>The corresponding BMI is ' + result.toFixed(2) + '.</h1>');
});

export default bmi;

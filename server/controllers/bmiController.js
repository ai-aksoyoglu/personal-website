export const renderBmiPage = (req, res) => {
  res.render('bmi');
};

export const calculateBmi = (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);
  const result = weight / (height * height);
  res.send('<h1>The corresponding BMI is ' + result.toFixed(2) + '.</h1>');
};

import { Router } from 'express';
const about = Router();

about.get('/', function (req, res) {
  res.render('about');
});

export default about;

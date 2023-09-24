import { Router } from 'express';
const homepage = Router();

homepage.get('/', function (req, res) {
  res.render('homepage');
});

export default homepage;

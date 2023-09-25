import express from 'express';
const { Router } = express;

const homepage = Router();

homepage.get('/', function (req, res) {
  res.render('homepage');
});

export default homepage;

import express from 'express';

const { Router } = express;
const simon = Router();

simon.get('/', (req, res) => {
  res.render('simon');
});

export default simon;

import { Router } from 'express';

const simon = Router();

simon.get('/', (req, res) => {
  res.render('simon');
});

export default simon;

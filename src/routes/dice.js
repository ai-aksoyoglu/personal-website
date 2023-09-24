import { Router } from 'express';

const dice = Router();

dice.get('/', (req, res) => {
  res.render('dice');
});

export default dice;

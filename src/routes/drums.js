import { Router } from 'express';

const drums = Router();

drums.get('/', (req, res) => {
  res.render('drums');
});

export default drums;

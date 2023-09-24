import { Router } from 'express';
const contact = Router();

contact.get('/', function (req, res) {
  res.render('contact');
});

export default contact;

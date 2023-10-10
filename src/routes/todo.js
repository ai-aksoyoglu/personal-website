import express from 'express';
import {
  handleGet,
  handlePostAddItem,
  handlePostDeleteItem,
} from '../../server/helpers/index.js';

const { Router } = express;
const today = Router();
const work = Router();

today.get('/', function (req, res, next) {
  const currentDate = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const todayStr = currentDate.toLocaleDateString(undefined, options);
  handleGet('Today', todayStr, req, res, next);
});

work.get('/', function (req, res, next) {
  handleGet('Work', 'Work List', req, res, next);
});

today.post('/addItem', function (req, res, next) {
  const itemName = req.body.newItem;
  handlePostAddItem('Today', itemName, req, res, next);
});

work.post('/addItem', function (req, res, next) {
  const itemName = req.body.newItem;
  handlePostAddItem('Work', itemName, req, res, next);
});

today.post('/deleteItem', function (req, res, next) {
  const checkedItemId = req.body.checkbox;
  handlePostDeleteItem('Today', checkedItemId, req, res, next);
});

work.post('/deleteItem', function (req, res, next) {
  const checkedItemId = req.body.checkbox;
  handlePostDeleteItem('Work', checkedItemId, req, res, next);
});

export { today, work };

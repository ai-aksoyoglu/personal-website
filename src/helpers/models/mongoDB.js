import mongoose from 'mongoose';

const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item name is required.'],
  },
  listName: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model('Item', itemsSchema);

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  items: [itemsSchema],
});

const List = mongoose.model('List', listSchema);

const defaultItems = [
  new Item({ name: 'Buy Food', listName: 'Today' }),
  new Item({ name: 'Cook', listName: 'Today' }),
  new Item({ name: 'Eat 🎉', listName: 'Today' }),
];

export { List, Item, defaultItems };

const mongoose = require('mongoose');

// Connection URL
mongoose.connect('mongodb://localhost:27017/fruitsDB');

// Defining the schema
const { Schema } = mongoose;

const fruitSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  rating: Number,
  review: String,
});

const Fruit = mongoose.model('Fruit', fruitSchema);

const fruit = new Fruit({ name: 'Apple', rating: 7, review: 'Very healthy' });
fruit.save().then(() => console.log('A fruit was added.'));

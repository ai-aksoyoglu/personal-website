const mongoose = require('mongoose');

// Connection URL
mongoose.connect('mongodb://localhost:27017/fruitsDB');

const { Schema } = mongoose;

// Defining the schema for fruits
const fruitSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please check your data entry, no name was specified'],
  }, // String is shorthand for {type: String}
  rating: { type: Number, min: 1, max: 10 },
  review: String,
});

const Fruit = mongoose.model('Fruit', fruitSchema);

// Defining a new schema for people
const personSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  age: Number,
  favouriteFruit: fruitSchema,
});

const Person = mongoose.model('Person', personSchema);

const pineapple = new Fruit({
  name: 'Pineapple',
  rating: 9,
  review: "Not everyone's cup of tea",
});

pineapple.save().then(() => console.log('A pineapple was added.'));

const person = new Person({
  name: 'Amy',
  rating: 12,
  favouriteFruit: pineapple,
});
person.save().then(() => console.log('Amy was added.'));

const apple = new Fruit({ name: 'Apple', rating: 7, review: 'Very healthy' });
// Add more fruits
const kiwi = new Fruit({ name: 'Kiwi', rating: 10, review: 'Might be sour' });

const orange = new Fruit({ name: 'Orange', rating: 4, review: 'A citric' });

const banana = new Fruit({ name: 'Banana', rating: 3, review: 'Delicious' });

/*
Fruit.insertMany([kiwi, orange, banana], function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully added more fruits');
  }
});*/

// Read from the fruitsDB database
Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    //    console.log(fruits);
    fruits.forEach((element) => console.log(element.name));
  }
});

/* Update from the fruitsDB database
Fruit.updateOne(
  { _id: '61fd472390d656e5a0948ee0' },
  { name: 'Peach' },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully update the name of the first entry');
    }
  }
);*/

/* delete one entry
Fruit.deleteOne({ name: 'Peach' }, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully delete the entry with name peach');
  }
});*/

// delete many
Person.deleteMany({ name: 'John' }, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(
      'Successfully delete all the entries with name John from the People collection inside fruitsDB'
    );
  }
});

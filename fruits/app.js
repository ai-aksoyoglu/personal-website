const mongoose = require('mongoose');

// Connection URL
mongoose.connect('mongodb://localhost:27017/fruitsDB');

async function run() {
  try {
    const db = client.db(dbName);

    //Get the documents collection with
    const collection = db.collection('fruits');

    // create an array of documents to insert
    const docs = [
      { name: 'Apple', score: 8, review: 'This fruit is great!' },
      { name: 'Orange', score: 6, review: 'Maybe sour.' },
      { name: 'Banana', score: 9, review: 'Very healthy' },
    ];

    const insertDocuments = await collection.insertMany(docs);
    console.log(`${insertDocuments.insertedCount} documents were inserted`);

    console.log(
      `In the fruits collection, in the ${dbName} database, there are now:`
    );
    const findDocuments = await collection.find({}).forEach((fruits) => {
      console.log(fruits.name);
    });
  } finally {
    await client.close(function (err) {
      assert.equal(null, err);
      console.log('------------');
    });
  }
}
run().catch(console.dir);

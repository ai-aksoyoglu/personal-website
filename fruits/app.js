const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'fruitsDB';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('fruits');

  // the following code examples can be pasted here...

  // create a document to insert
  const doc = [
    {
      name: 'Apple',
      score: 8,
      review: 'This fruit is great! An apple a day keeps the doctor away.',
    },
    {
      name: 'Orange',
      score: 6,
      review: 'Maybe sour.',
    },
    {
      name: 'Banana',
      score: 9,
      review: 'Very healthy',
    },
  ];
  const result = await collection.insertMany(doc);
  console.log(`${result.insertedCount} documents were inserted`);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

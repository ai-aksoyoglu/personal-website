import { List, defaultItems } from './models/mongoDB.js';

function runInitialization() {
  ['Today', 'Work'].forEach((listName) => {
    List.findOne({ name: listName }, (err, foundList) => {
      if (!foundList) {
        const list = new List({
          name: listName,
          items: defaultItems,
        });
        list.save((err) => {
          if (err && err.code === 11000) {
            console.log(
              `A list with the name "${listName}" already exists in the database.`
            );
          } else if (err) {
            console.log('An unexpected error occurred:', err);
          } else {
            console.log(
              `A list named "${listName}" was successfully created in the database with some default items.`
            );
          }
        });
      }
    });
  });
}

export { runInitialization };

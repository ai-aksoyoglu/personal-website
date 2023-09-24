import { List, Item, defaultItems } from './models/mongoDB.js';

export async function handleGet(listName, listTitle, req, res, next) {
  try {
    const foundList = await List.findOne({ name: listName });
    if (!foundList) {
      const list = new List({ name: listName, items: defaultItems });
      await list.save();
      return res.redirect(`/todo/${listName.toLowerCase()}`);
    }
    return res.render('todo', {
      listTitle: listTitle,
      listValue: listName.toLowerCase(),
      newListItems: foundList.items,
    });
  } catch (err) {
    next(err);
  }
}

export async function handlePostAddItem(listName, itemName, req, res, next) {
  try {
    const item = new Item({ name: itemName, listName: listName });
    const foundList = await List.findOne({ name: listName });

    if (!foundList) {
      return next(new Error('List not found')); // you can create a specific error object here
    }

    foundList.items.push(item);
    await foundList.save();
    res.redirect(`/todo/${listName.toLowerCase()}`);
  } catch (err) {
    next(err);
  }
}

export async function handlePostDeleteItem(
  listName,
  checkedItemId,
  req,
  res,
  next
) {
  try {
    const foundList = await List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } },
      { new: true } // returns the modified document
    );

    if (!foundList) {
      return next(new Error('List not found or item not in list')); // you can create a specific error object here
    }

    res.redirect(`/todo/${listName.toLowerCase()}`);
  } catch (err) {
    next(err);
  }
}

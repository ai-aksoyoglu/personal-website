let List;
async function getListModel() {
  if (!List) {
    const module = await import('../models/mongoDB.js');
    List = module.List;
  }
  return List;
}

export async function handleGet(listName, listTitle, req, res, next) {
  try {
    const List = await getListModel();
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
    const List = await getListModel();
    const foundList = await List.findOne({ name: listName });

    if (!foundList) {
      return next(new Error('List not found'));
    }

    // Push new item directly to the items array
    foundList.items.push({ name: itemName });
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
    const List = await getListModel();
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

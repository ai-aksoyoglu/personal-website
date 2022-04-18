const express = require("express");
var favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

require("dotenv").config();
//console.log(process.env); // remove this after you've confirmed it working

const mongoose = require("mongoose");
/* without mongodb
const date = require(__dirname + '/date.js');*/

const _ = require("lodash");
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const mailchimp = require("@mailchimp/mailchimp_marketing");
mailchimp.setConfig({
  apiKey: process.env.mailchimp_apiKey,
  server: "us20",
});
/*check if mailchimp works successfully (api call)
async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}
run();*/

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// maybe I don't need this:
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.set("view engine", "ejs");

/* without mongodb
const items = ['Buy food', 'Cook', 'Eat 🎉'];
const workItems = [];*/
let posts = [];
let urlPostTitles = [];

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started running on port " + process.env.PORT);
});

app.get("/about", function (req, res) {
  res.render("about");
});

/*__dirname = /home/alexandra/Desktop/_Web Development_/personal-website*/

app.get("/bmi", function (req, res) {
  res.sendFile(__dirname + "/bmi.html");
});

app.post("/bmi", function (req, res) {
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  var result = weight / (height * height);
  res.send("<h1>The corresponding BMI is " + result.toFixed(2) + ".</h1>");
});

app.get("/weather", function (req, res) {
  res.sendFile(__dirname + "/weather.html");
});

app.post("/weather", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "bbfc773fa75427fe40a14807a7863b2a";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units;
  https
    .get(url, (response) => {
      console.log("statusCode:", response.statusCode);
      console.log("headers:", response.headers);

      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write(
          "<p>The weather is currently " +
            weatherDescription +
            ". </p><img src=" +
            imageURL +
            ">"
        );
        res.write(
          "<h1>The temperature in " +
            req.body.cityName +
            " is now " +
            temp +
            " degrees Celcius.</h1>"
        );
        res.send();
      });
    })
    .on("error", (e) => {
      console.error(e);
    });
});

app.get("/newsletter-signup", (req, res) => res.render("newsletter-signup"));

app.post("/newsletter-signup", async function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  const listId = process.env.mailchimp_listID;

  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });

    //If all goes well logging the contact's id
    res.render("newsletter-signup");
    console.log(
      "Successfully added contact as an audience member. The contact's id is" +
        response.id +
        "."
    );
  } catch (err) {
    //Running the function and catching the errors (if any)
    // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
    // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page

    res.redirect("/newsletter-failure");
  }
});

app.get("/newsletter-failure", (req, res) => res.render("newsletter-failure"));

/*const url = "https://us20.api.mailchimp.com/3.0/lists/" + process.env.mailchimp_listID;

  const options = {
    method: "POST",
    auth: "ai.aksoyoglu:process.env.mailchimp_apiKey",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  const jsonData = JSON.stringify(subscribingUser);

  request.write(jsonData);
  request.end;

  res.send(
    "<h1>Your name is " +
      firstName +
      " " +
      lastName +
      " and your email address is " +
      email +
      ". Thank you for signing up for the newsletter service.</h1>"
  );
});

// With mongodb
mongoose.connect('mongodb://localhost:27017/todolistDB');*/

// With MongoDB Cloud Atlas
const mongoDB_username = process.env.mongoDB_username;
const mongoDB_password = process.env.mongoDB_password;
mongoose.connect(
  `mongodb+srv://${mongoDB_username}:${mongoDB_password}@cluster0.jrfbq.mongodb.net/todolistDB`
);

const { Schema } = mongoose;

// Defining the schema for fruits
const itemsSchema = new Schema({
  name: {
    type: String,
    required: [true, "No name was specified for this item"],
  },
});

const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({
  name: "Buy Food",
});
const item2 = new Item({
  name: "Cook",
});
const item3 = new Item({
  name: "Eat 🎉",
});
const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

const List = mongoose.model("List", listSchema);

app.get("/todolist", function (req, res) {
  /* without mongodb
  const day = date.getDay();
  const day = date.getDate();*/

  Item.find(function (err, foundItems) {
    if (err) {
      console.log(err);
    } else {
      //    console.log(foundItems);
      if (foundItems.length === 0) {
        Item.insertMany(defaultItems, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully added the 3 default items");
          }
        });
        res.redirect("/todolist");
      } else {
        res.render("list", {
          listTitle: "Today",
          listValue: "today",
          newListItems: foundItems,
        });
      }
    }
  });
});

app.post("/todolist", function (req, res) {
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName,
  });

  if (req.body.list === "today") {
    item.save();
    res.redirect("/todolist");
  } else {
    List.findOne({ name: req.body.list }, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + req.body.list);
    });
  }
});

app.post("/todolist/deleteItem", function (req, res) {
  const checkedItemId = req.body.checkbox;

  if (req.body.listCheckedOff === "today") {
    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (!err) {
        console.log("Successfully deleted the checked item");
        res.redirect("/todolist");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: req.body.listCheckedOff },
      { $pull: { items: { _id: checkedItemId } } },
      function (err, foundList) {
        if (!err) {
          res.redirect("/" + req.body.listCheckedOff);
        }
      }
    );
  }
});

app.get("/blog-home", function (req, res) {
  res.render("blog-home", { homeContent: homeStartingContent, posts: posts });
});

app.get("/blog-about", function (req, res) {
  res.render("blog-about", { aboutContent: aboutContent });
});

app.get("/blog-contact", function (req, res) {
  res.render("blog-contact", { contactContent: contactContent });
});

app.get("/blog-compose", function (req, res) {
  res.render("blog-compose", {});
});

app.post("/blog-compose", function (req, res) {
  const post = { title: req.body.postTitle, content: req.body.postBody };
  posts.push(post);
  urlPostTitles.push(_.kebabCase(post.title));
  res.redirect("/blog-home");
});

app.get("/posts/:postName", function (req, res) {
  var requestedTitle = _.kebabCase(req.params.postName);
  if (urlPostTitles.includes(requestedTitle)) {
    posts.forEach(function (post) {
      if (requestedTitle === _.kebabCase(post.title)) {
        res.render("blog-post", { post: post });
      }
    });
  } else {
    res.redirect("/blog-home");
  }
});

// This should be the last get
app.get("/:customListName", function (req, res) {
  var customListName = _.capitalize(req.params.customListName);

  console.log(customListName);
  if (customListName != "Favicon.ico") {
    List.findOne({ name: customListName }, async function (err, foundList) {
      if (!err) {
        if (!foundList) {
          console.log(
            "The " + customListName + " does not exist yet, it will be created."
          );
          const list = new List({
            name: customListName,
            items: defaultItems,
          });
          await list.save();
          res.redirect("/" + customListName);
        } else {
          console.log("The " + foundList.name + " list already exists!");
          res.render("list", {
            listTitle: foundList.name,
            listValue: foundList.name,
            newListItems: foundList.items,
          });
        }
      }
    });
  }
});

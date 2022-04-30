//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const mongoDB_username = process.env.mongoDB_username;
const mongoDB_password = process.env.mongoDB_password;
const AuthUsersDBconn = mongoose.createConnection(
  `mongodb+srv://${mongoDB_username}:${mongoDB_password}@cluster0.jrfbq.mongodb.net/AuthUsersDB`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const { Schema } = mongoose;

const passportUsersSchema = new Schema({
  email: String,
  password: String,
});

passportUsersSchema.plugin(passportLocalMongoose);
passportUsersSchema.plugin(findOrCreate);

const passportUser = AuthUsersDBconn.model("passportUser", passportUsersSchema);

passport.use(passportUser.createStrategy());

passport.serializeUser(passportUser.serializeUser());
passport.deserializeUser(passportUser.deserializeUser());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleOAuthClientID,
      clientSecret: process.env.googleOAuthClientSecret,
      callbackURL: "http://localhost:3000/auth/google/secrets",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

app.get("/", function (req, res) {
  res.render("home");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/secrets", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.post("/register", function (req, res) {
  passportUser.register(
    { username: req.body.username },
    req.body.password,
    function (err, passportUser) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        console.log(req.body);
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        });
      }
    }
  );
});

app.post("/login", function (req, res) {
  const user = new passportUser({
    email: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(req);
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});

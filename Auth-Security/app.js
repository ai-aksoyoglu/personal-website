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

const googleUsersSchema = new Schema({
  username: String,
  password: String,
  googleId: String,
  secret: String,
});

googleUsersSchema.plugin(passportLocalMongoose);
googleUsersSchema.plugin(findOrCreate);

const googleUser = AuthUsersDBconn.model("googleUser", googleUsersSchema);

passport.use(googleUser.createStrategy());

passport.serializeUser(function (user, done) {
  //We can identify the user uniquely by the id,
  //so we only serialize this into the session token.
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  googleUser.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleOAuthClientID,
      clientSecret: process.env.googleOAuthClientSecret,
      callbackURL: "http://localhost:3000/auth/google/secrets",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      googleUser.findOrCreate({ googleId: profile.id }, function (err, user) {
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

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect to the secrets page.
    res.redirect("/secrets");
  }
);

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/secrets", function (req, res) {
  // if (req.isAuthenticated()) {
  //   res.render("secrets");
  // } else {
  //   res.redirect("/login");
  // }

  googleUser.find({ secret: { $ne: null } }, function (err, foundUsers) {
    if (err) {
      console.log(err);
    } else {
      if (foundUsers) {
        res.render("secrets", { usersWithSecrets: foundUsers });
      }
    }
  });
});

app.get("/submit", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

app.post("/submit", function (req, res) {
  const submittedSecret = req.body.secret;

  //Once the user is authenticated and their session gets saved, their user details are saved to req.user.
  // console.log(req.user.id);

  googleUser.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.secret = submittedSecret;
        foundUser.save(function () {
          res.redirect("/secrets");
        });
      }
    }
  });
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.post("/register", function (req, res) {
  googleUser.register(
    { username: req.body.username },
    req.body.password,
    function (err, googleUser) {
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
  const user = new googleUser({
    username: req.body.username,
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

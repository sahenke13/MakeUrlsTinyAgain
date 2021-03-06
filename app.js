const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const shortid = require("shortid");

//bring in shortURL db and User db and possible current User db
const shortURLdb = require("./models/shortUrl");
const userdb = require("./models/user");
const curUserdb = require("./models/curUser");

const PORT = process.env.port || 3000;

//create an instance of express
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/"));

//remove blank space from shortid
shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);
// set view engine to ejs
app.set("view engine", "ejs");

//serve up static routes

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes

//bring in dotenv to hide sensitive information
require("dotenv").load();

const MONGODB_URI = process.env.MONGODB_URI || process.env.LOCAL_MONGO_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log("connected to mongodb");
});

// html/ejs routes
app.get("/", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/shortUrl", (req, res) => {
  console.log("route has been hit, the shortURL route that is");
  res.render("shortUrl");
});

app.post("/m/user", (req, res) => {
  console.log("creating a user here :", req.body);
  let email = req.body.email;
  let password = req.body.password;
  let userObj = { email: email, password: password };
  userdb.create(userObj).then(data => {
    console.log(data);
  });
});

//create a post route to set curUser
app.post("/m/curUser", (req, res) => {
  console.log("the curUser route got hit");
  console.log("req.body: ", req.body.curUser);
  curUserdb.create({ currentUser: req.body.curUser }).then(() => {
    console.log("current user created");
  });
});
//route to get current User.
app.get("/m/curUser/", (req, res) => {
  console.log("CurUser GET route hit");

  curUserdb.find().then(data => res.json(data));
});

// route to delete current user

app.delete("/m/curUser/", (req, res) => {
  console.log("delete user has been clicked");
  curUserdb.deleteMany().then(data => console.log("delete data: ", data));
});
//data route to get short URLs by user

app.get("/m/user/:id", (req, res) => {
  console.log("route is being hit");
  let user = req.params.id;
  console.log(user);
  let data;
  shortURLdb.find({ user: req.params.id }).then(data => {
    console.log("here are all your shortURLS: ", data);
    res.json(data);
  });
});
//route to get all users and to see if they already exist.
app.get("/m/user", (req, res) => {
  //grab users and compare to user by email being created in main.js

  userdb.find().then(data => res.json(data));
});

//route to get all shortURLs
app.get("/m", (req, res) => {
  db.find().then(data => res.json(data));
  res.render("shortUrl");
});

//route to get specific URL, then needs to redirect
app.get("/m/:id", (req, res) => {
  let tinyID = req.params.id;
  let data;
  console.log("tinyID is: ", tinyID);
  shortURLdb
    .find({ shortURL: "http://localhost:3000/m/" + tinyID })
    .then(data => {
      console.log("newData is: ", data[0].longURL);
      console.log("count: ", data[0].count);
      let newCount = data[0].count;
      newCount++;
      console.log("newCount is: ", newCount);

      shortURLdb
        .findOneAndUpdate(
          { shortURL: "http://localhost:3000/m/" + tinyID },
          { count: newCount }
        )
        .then(data => console.log("findOneAndUpdate: ", data));

      res.redirect(data[0].longURL);
    });
});

//route to post to API, and create Mongo Entry
app.post("/m", (req, res) => {
  let user = req.body.user;
  let longURL = req.body.longURL;
  let count = req.body.count;
  let shortURL = "http://localhost:3000/m/" + shortid.generate();

  console.log("user is in user post route: ", user);

  //create dataObj to pass to Mongo
  let dataObj = {
    user: user,
    longURL: longURL,
    count: count,
    shortURL: shortURL
  };
  //create mongo entry
  shortURLdb.create(dataObj).then(data => {
    console.log(data);
  });
});

app.listen(PORT, () => {
  console.log("listening on port 3000");
});

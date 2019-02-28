const express = require("express");
const authRoutes = require("./routes/authRoutes");
const shortUrlRoute = require("./routes/shortUrlRoutes");
const passportSetup = require("./config/passportSetup");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const shortid = require("shortid");

//bring in shortURL db
const db = require("./models/shortUrl");

const PORT = process.env.port || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//remove blank space from shortid
shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);
//view engine
app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 1 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

//initial passport
app.use(passport.initialize());
app.use(passport.session());

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/"));
//routes
app.use("/auth", authRoutes);
app.use("/shortUrl", shortUrlRoute);

require("dotenv").load();

const MONGODB_URI = process.env.MONGODB_URI || process.env.LOCAL_MONGO_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log("connected to mongodb");
});

// home route
app.get("/", (req, res) => {
  //this is just a test of ShortID will need to remove
  let something = shortid.generate();
  console.log(something);
  res.render("home");
});

//app to get short URLs by user
app.get("/m/user/:id", (req, res) => {});
app.get("/m", (req, res) => {});

//route to get specific URL, then needs to redirect
app.get("/m/:id", (req, res) => {});

//route to post to API, and create Mongo Entry
app.post("/m", (req, res) => {
  let user = req.body.user;
  let longURL = req.body.longURL;
  let count = req.body.count;
  let shortURL = "http://localhost:3000/m/" + shortid.generate();
  let dataObj = {
    user: user,
    longURL: longURL,
    count: count,
    shortURL: shortURL
  };
  //create mongo entry
  db.create(dataObj).then(data => {
    console.log(data);
  });
});

app.listen(PORT, () => {
  console.log("listening on port 3000");
});

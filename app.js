const express = require("express");
const authRoutes = require("./routes/authRoutes");
const shortUrlRoute = require("./routes/shortUrlRoutes");
const passportSetup = require("./config/passportSetup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

const PORT = process.env.port || 3000;
const app = express();

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

app.listen(PORT, () => {
  console.log("listening on port 3000");
});

// home route
app.get("/", (req, res) => {
  res.render("home");
});

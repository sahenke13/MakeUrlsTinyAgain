const express = require("express");
const authRoutes = require("./routes/authRoutes");
const passportSetup = require("./config/passportSetup");
const mongoose = require("mongoose");

const PORT = process.env.port || 3000;
const app = express();

//view engine
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/"));
//routes
app.use("/auth", authRoutes);

require("dotenv").load();

const MONGODB_URI = process.env.MONGODB_URI || process.env.LOCAL_MONGO_URI;

mongoose.connect(MONGODB_URI, () => {
  console.log("connected to mongodb");
});

app.listen(PORT, () => {
  console.log("listening on port 3000");
});

// home route
app.get("/", (req, res) => {
  res.render("home");
});

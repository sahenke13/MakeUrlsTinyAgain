const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();

//view engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/"));

//routes
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("listening on port 3000");
});

// home route
app.get("/", (req, res) => {
  res.render("home");
});

const router = require("express").Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    //executes if user is not logged in.
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.get("/", authCheck, (req, res) => {
  res.render("shortUrl", { user: req.user });
});

module.exports = router;

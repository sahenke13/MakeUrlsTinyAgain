const router = require("express").Router();
const passport = require("passport");

//login

router.get("/login", (req, res) => {
  res.render("login");
});

//logout
router.get("/logout", (req, res) => {
  req.logout();
  res.render("home");
});

//google auth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);
//callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // res.send(req.user);

  res.redirect("/shortUrl/");
});

module.exports = router;

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //options for the google strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      // check to see if the user is new or already exists

      User.findOne({ googleId: profile.id }).then(curUser => {
        if (curUser) {
          console.log("existing user is: ", curUser);
          done(null, curUser);
        } else {
          new User({
            userName: profile.displayName,
            googleId: profile.id
          })
            .save()
            .then(rec => {
              console.log("new user created: ", rec);
              done(null, rec);
            });
        }
      });
    }
  )
);

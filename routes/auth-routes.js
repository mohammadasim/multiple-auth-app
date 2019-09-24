const router = require('express').Router();
const passport = require("passport");
const session = require("express-session");

//auth routes
router.get("/", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});


router.get("/twitter", passport.authenticate('twitter', {
  scope: ['profile']
}));

router.get("/twitter/callback", passport.authenticate('twitter', {
  failureRedirect: '/login'
}), (req, res) => {
  res.redirect("/secret");
});


router.get("/google", passport.authenticate('google', {
  scope: ['profile']
}));

router.get("/google/callback", passport.authenticate('google', {
  failureRedirect: '/login'
}),(req, res) => {
  res.redirect("/secret");
});

router.get("/linkdin", passport.authenticate('linkedin'));

router.get("/linkdin/callback", passport.authenticate('linkedin'),(req, res) => {
  
});


module.exports = router;
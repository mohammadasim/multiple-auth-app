const router = require('express').Router();
const passport = require("passport");
const session = require("express-session");

//auth routes
router.get("/", (req, res) => {
    res.render("login");
});

router.get("/logout", (req, res) => {
  res.send("logging out");
});


router.get("/twitter",passport.authenticate('twitter',{
	scope:['profile', 'token', 'tokenSecret']
}));

router.get("/twitter/callback", passport.authenticate('twitter'),(req, res) => {
    res.redirect("/secret");
});

module.exports = router;
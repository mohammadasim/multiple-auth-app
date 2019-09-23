const router = require('express').Router();
const passport = require("passport");
const session = require("express-session");

//auth routes
router.get("/", (req, res) => {
    res.render("login");
});

router.get("/logout", (req, res) => {
  console.log("the logout url invoked");
  req.logOut();
  res.redirect("/");
});


router.get("/twitter",passport.authenticate('twitter',{
	scope:['profile']
}));

router.get("/twitter/callback", passport.authenticate('twitter',{ failureRedirect: '/login' }),(req, res) => {
    res.redirect("/secret");
});



module.exports = router;
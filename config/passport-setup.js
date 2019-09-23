const passport = require("passport"),
    TwitterStategy = require("passport-twitter"),
    User = require("../models/user")

passport.use(new TwitterStategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET_KEY,
    callbackURL: "http://127.0.0.1:5000/login/twitter/callback"
},(token, tokenSecret, profile, done) => {
    //Passport call back function
    console.log('passport callback function fired');
    new User({
        userName: profile.username,
        twitterId: profile.id,
        oauthToken: token,
        oauthToken_secret: tokenSecret
    }).save().then((newUser)=>{
        console.log(newUser);
    })
}));
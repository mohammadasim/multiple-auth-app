const passport = require("passport"),
    TwitterStategy = require("passport-twitter"),
    User = require("../models/user")


// Once the callback function is finished the following functions are invoked.
// First the serialize and then the deserialize. 
// We are setting here the user_id to the cookie and sending it to the browser encrypted.
passport.serializeUser((user, done)=> {
    done(null, user.id);
});

// deserialize receives back the cookie from the browser and then digout the user._id to check if the user is logged in or not.
passport.deserializeUser((id, done) =>{
    User.findById(id).then((user) =>{
        done(null, user);
    })
});
passport.use(new TwitterStategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET_KEY,
    callbackURL: "http://127.0.0.1:5000/login/twitter/callback"
},(token, tokenSecret, profile, done) => {
    User.findOne({twitterId: profile.id}).then((currentUser)=>{
        if(currentUser){
            // already have this user
            done(null, currentUser);
        }else{
            new User({
                userName: profile.username,
                twitterId: profile.id,
                oauthToken: token,
                tockenSecret: tokenSecret
            }).save().then((newUser)=>{
                // done enabled us to exit the passportjs code, null in the done method can be replaced with err, we are setting err to null, assuming
                // no error will be thrown.
                done(null, newUser);
            })
        }
    })
    
}));
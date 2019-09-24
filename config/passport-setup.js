const passport = require("passport"),
    TwitterStategy = require("passport-twitter"),
    GoogleStrategy = require("passport-google-oauth20"),
    LinkedInStrategy = require('passport-linkedin-oauth2').Strategy,
    User = require("../models/user"),
    keys = require("./keys")


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

//********************************* TWITTER PASSPORT STRATEGY *********************/
passport.use(new TwitterStategy({
    consumerKey: keys.twitter.consumerKey,
    consumerSecret: keys.twitter.consumerSecret,
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
                twitterOauthToken: token,
                twitterTockenSecret: tokenSecret
            }).save().then((newUser)=>{
                // done enabled us to exit the passportjs code, null in the done method can be replaced with err, we are setting err to null, assuming
                // no error will be thrown.
                done(null, newUser);
            })
        }
    })
    
}));

//******************************************** GOOGLE PASSPORT STRTEGY SETUP *******************************************************/

passport.use(new GoogleStrategy({
    clientID: keys.google.client_id,
    clientSecret: keys.google.client_secret,
    callbackURL: "/login/google/callback"
},(accessToken, refreshToken, profile, done) =>{
    User.findOne({googleId: profile.id}).then((currentUser)=>{
        if(currentUser){
            done(null, currentUser);
        }
        else{
            User.create({
                userName: profile.displayName,
                googleId: profile.id,
                googleAccessToken: accessToken
            }).then((newUser)=>{
                done(null, newUser);
            });
        }
    });
}));

//**************************************** LINKDIN PASSPORT STRATEGY ***********************************/

passport.use(new LinkedInStrategy({
    clientID: keys.linkdin.client_id,
    clientSecret: keys.linkdin.client_secret,
    callbackURL: "http://127.0.0.1:5000/login/linkdin/callback",
    scope: ['r_emailaddress', 'r_basicprofile']
},(accessToken, refreshToken, profile, cb)=>{
    console.log("The Linkdin passport callback function has been invoked");
}));
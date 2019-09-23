const express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("./connection"),
    passport = require("passport"),
    session = require("express-session"),
    TwitterStategy = require("passport-twitter"),
    authRoutes = require("./routes/auth-routes"),
    passportSetup = require("./config/passport-setup")
    User = require("./models/user")


const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}));

app.use('/login', authRoutes);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

/******************************************** ROUTES **************************************************/
app.get("/", (req, res) => {
    res.render("home");
});


app.get("/secret", (req, res) => {
    res.render("secret");
});








/********************************************* RUN SERVER ********************************************/
const port = process.env.PORT || 5000;

app.listen(port, () => `Multi-auth-app Server running on port ${port} 🔥`);
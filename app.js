const express = require("express"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    session = require("express-session"),
    authRoutes = require("./routes/auth-routes"),
    passportSetup = require("./config/passport-setup"),
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


app.use(passport.initialize());
app.use(passport.session());


app.use('/login', authRoutes);

/******************************************** ROUTES **************************************************/
app.get("/", (req, res) => {
    res.render("home");
});


app.get("/secret", require("connect-ensure-login").ensureLoggedIn(),(req, res) => {
    res.render("secret", {user: req.user});
});








/********************************************* RUN SERVER ********************************************/
const port = process.env.PORT || 5000;

app.listen(port, () => `Multi-auth-app Server running on port ${port} 🔥`);
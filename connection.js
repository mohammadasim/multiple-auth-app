const mongoose = require("mongoose");
const keys = require("./config/keys")

// DB CONNECTION SETUP
var DATABASE_URL = keys.mongodb.db_url;
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We are connected to the database!!");
});

module.exports = mongoose;
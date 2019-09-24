const mongoose = require("../connection");
//SCHEMA SETUP
var userSchema = new mongoose.Schema({
    userName: String,
    twitterId: String,
    twitterOauthToken: String,
    twitterTockenSecret: String,
    googleId: String,
    googleAccessToken: String
  });
  // Export module
  module.exports = mongoose.model('User', userSchema);
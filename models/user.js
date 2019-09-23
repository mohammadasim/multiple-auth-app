const mongoose = require("../connection");
//SCHEMA SETUP
var userSchema = new mongoose.Schema({
    userName: String,
    twitterId: String,
    oauthToken: String,
    tockenSecret: String
  });
  // Export module
  module.exports = mongoose.model('User', userSchema);
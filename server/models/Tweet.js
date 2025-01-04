const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  topic: String,
  content: String,
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;

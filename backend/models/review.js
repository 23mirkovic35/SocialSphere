const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let Review = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  rating: Number,
  title: String,
  comment: String,
  author: String,
  profilePicture: String,
  username: String,
});

const review = mongoose.model("Review", Review, "reviews");
module.exports = review;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let Post = new Schema({
  _id: Object,
  username: String,
  type: Number,
  text: String,
  images: Array,
  videos: Array,
  likes: Array,
  comments: Array,
  time: Date,
});

const post = mongoose.model("Post", Post, "posts");
module.exports = post;

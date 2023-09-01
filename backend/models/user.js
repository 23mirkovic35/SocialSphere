const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let User = new Schema({
  _id: Object,
  name: String,
  username: String,
  email: String,
  password: String,
  profilePicture: String,
  backgroundPicture: String,
  biography: String,
  city: String,
  country: String,
  birthday: String,
  friends: Array,
  friendRequests: Array,
  myRequests: Array,
  posts: Array,
  notifications: Array,
  instagram: String,
  facebook: String,
  twitter: String,
  tiktok: String,
  snapchat: String,
  verified: Boolean,
});

const user = mongoose.model("User", User, "users");
module.exports = user;

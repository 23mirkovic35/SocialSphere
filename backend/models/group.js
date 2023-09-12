const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let Group = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  admins: Array,
  members: Array,
  posts: Array,
});

const group = mongoose.model("Group", Group, "groups");
module.exports = group;

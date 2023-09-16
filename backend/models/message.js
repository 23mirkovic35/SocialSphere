const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let Message = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  conversationID: mongoose.Schema.Types.ObjectId,
  senderID: String,
  type: String,
  text: String,
  images: Array,
  videos: Array,
  time: Date,
});

const message = mongoose.model("Message", Message, "messages");
module.exports = message;

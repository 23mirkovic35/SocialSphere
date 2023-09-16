const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Conversation = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  members: Array,
  lastMessage: mongoose.Schema.Types.ObjectId,
});
const conversation = mongoose.model(
  "Conversation",
  Conversation,
  "conversations"
);
module.exports = conversation;

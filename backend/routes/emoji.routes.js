const express = require("express");
const emojiController = require("../controllers/emoji.controller.js");
const emojiRouter = express.Router();

emojiRouter
  .route("/getEmojis")
  .get((req, res) => new emojiController().getEmojis(req, res));

module.exports = emojiRouter;

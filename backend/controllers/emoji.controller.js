const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
class EmojiController {
  API_KEY = "bc79671f5bc1e3a1f82d5519a2745014f1c5d77d";

  getEmojis = (req, res) => {
    fetch(
      "https://emoji-api.com/emojis?access_key=ca4f54936c723f9e64e45bb21d25865b463ff212"
    )
      .then((response) => response.json())
      .then((data) => res.json(data));
  };
}

module.exports = EmojiController;

const express = require("express");
const mongoose = require("mongoose");
const message = require("../models/message.js");
class MessageController {
  getMessage = (req, res) => {
    const { _id } = req.body;
    const filter = { _id: _id };
    message
      .findOne(filter)
      .then((message) => res.json(message))
      .catch((error) => console.log(error));
  };

  getMessages = (req, res) => {
    const { conversationID } = req.body;
    message
      .find({ conversationID: conversationID })
      .then((messages) => res.json(messages))
      .catch((err) => console.log(err));
  };

  saveMessage = (req, res) => {
    // console.log(req.body);
    const { senderID, type, text, images, videos, time, conversationID } =
      req.body;
    let newMsg = new message({
      _id: new mongoose.Types.ObjectId(),
      senderID: senderID,
      type: type,
      text: text,
      images: images,
      videos: videos,
      time: time,
      conversationID: conversationID,
    });
    newMsg
      .save()
      .then(() => res.json({ message: "OK" }))
      .catch((err) => console.log(err));
  };
}

module.exports = MessageController;

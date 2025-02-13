const express = require("express");
const mongoose = require("mongoose");
const message = require("../models/message.js");
const conversation = require("../models/conversation.js");
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
    const {
      senderID,
      type,
      text,
      images,
      videos,
      documents,
      time,
      conversationID,
    } = req.body;
    const _id = new mongoose.Types.ObjectId();
    let newMsg = new message({
      _id: _id,
      senderID: senderID,
      type: type,
      text: text,
      images: images,
      videos: videos,
      documents: documents,
      time: time,
      conversationID: conversationID,
    });
    newMsg
      .save()
      .then(() => {
        conversation
          .findByIdAndUpdate({ _id: conversationID }, { lastMessage: _id })
          .then((result) => res.json("OK"))
          .catch((error) => console.log(error));
      })
      .catch((err) => console.log(err));
  };
  getAllAttachments = (req, res) => {
    const { conversationID } = req.body;
    message
      .find({ conversationID: conversationID })
      .then((messages) => {
        const images = [];
        const videos = [];
        const documents = [];
        messages.forEach((message) => {
          if (message.images.length > 0) images.push(message.images);
          if (message.videos.length > 0) videos.push(message.videos);
          if (message.documents.length > 0) documents.push(message.documents);
        });
        const returnObj = {
          images: images.flat(),
          videos: videos.flat(),
          documents: documents.flat(),
        };
        res.json(returnObj);
      })
      .catch((err) => console.log(err));
  };
}

module.exports = MessageController;

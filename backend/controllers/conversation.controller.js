const express = require("express");
const mongoose = require("mongoose");
const conversation = require("../models/conversation");

class ConversationController {
  getConversationsForUser = async (req, res) => {
    const username = req.body.username;
    console.log(username);
    try {
      const conversations = await conversation.find({
        members: { $in: [username] },
      });
      res.json(conversations);
    } catch (error) {
      console.log(error);
    }
  };
  updateLastMessage = (req, res) => {
    const conversationID = req.body.conversationID;
    const lastMessage = req.body.lastMessage;
    conversation.collection
      .updateOne(
        { _id: new mongoose.Types.ObjectId(conversationID) },
        { $set: { lastMessage: lastMessage } }
      )
      .then((data) => res.json(data))
      .catch((err) => console.log);
  };
  createConversation = (req, res) => {
    const { members } = req.body;
    const conversationObj = {
      _id: new mongoose.Types.ObjectId(),
      members: members,
      lastMessage: null,
    };
    const newConversation = new conversation(conversationObj);
    newConversation
      .save()
      .then((resolve) => res.json(conversationObj))
      .catch((error) => console.log(error));
  };
}

module.exports = ConversationController;

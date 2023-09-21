const express = require("express");
const messageController = require("../controllers/message.controller");
const messageRouter = express.Router();

messageRouter
  .route("/getMessages")
  .post((req, res) => new messageController().getMessages(req, res));
messageRouter
  .route("/saveMessage")
  .post((req, res) => new messageController().saveMessage(req, res));
messageRouter
  .route("/getMessage")
  .post((req, res) => new messageController().getMessage(req, res));
messageRouter
  .route("/getAllAttachments")
  .post((req, res) => new messageController().getAllAttachments(req, res));

module.exports = messageRouter;

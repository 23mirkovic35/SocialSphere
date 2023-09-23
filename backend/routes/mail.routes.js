const express = require("express");
const mailController = require("../controllers/mail.controller.js");
const mailRouter = express.Router();

mailRouter
  .route("/verify")
  .post((req, res) => new mailController().sendMail(req, res));

mailRouter
  .route("/forgotPassword")
  .post((req, res) => new mailController().forgotPassword(req, res));
module.exports = mailRouter;

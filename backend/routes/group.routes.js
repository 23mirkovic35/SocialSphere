const express = require("express");
const groupController = require("../controllers/group.controller.js");
const groupRouter = express.Router();

groupRouter
  .route("/createGroup")
  .post((req, res) => new groupController().createGroup(req, res));

groupRouter
  .route("/getUserGroups")
  .post((req, res) => new groupController().getUserGroups(req, res));

groupRouter
  .route("/getAllGroups")
  .post((req, res) => new groupController().getAllGroups(req, res));

groupRouter
  .route("/joinGroup")
  .post((req, res) => new groupController().joinGroup(req, res));

groupRouter
  .route("/getGroupData")
  .post((req, res) => new groupController().getGroupData(req, res));

groupRouter
  .route("/newPost")
  .post((req, res) => new groupController().newPost(req, res));

groupRouter
  .route("/updatePostLikes")
  .post((req, res) => new groupController().updatePostLikes(req, res));

groupRouter
  .route("/updatePostComments")
  .post((req, res) => new groupController().updatePostComments(req, res));

module.exports = groupRouter;

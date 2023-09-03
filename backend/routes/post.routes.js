const express = require("express");
const postController = require("../controllers/post.controller.js");
const postRouter = express.Router();

postRouter
  .route("/newPost")
  .post((req, res) => new postController().newPost(req, res));

postRouter
  .route("/getPosts")
  .post((req, res) => new postController().getPosts(req, res));

module.exports = postRouter;

const express = require("express");
const postController = require("../controllers/post.controller.js");
const postRouter = express.Router();

postRouter
  .route("/newPost")
  .post((req, res) => new postController().newPost(req, res));

postRouter
  .route("/getPosts")
  .post((req, res) => new postController().getPosts(req, res));

postRouter
  .route("/updateLikes")
  .post((req, res) => new postController().updateLikes(req, res));

postRouter
  .route("/updateComments")
  .post((req, res) => new postController().updateComments(req, res));

postRouter
  .route("/userPosts")
  .post((req, res) => new postController().userPosts(req, res));

postRouter
  .route("/getUserImages")
  .post((req, res) => new postController().getUserImages(req, res));

postRouter
  .route("/getPost")
  .post((req, res) => new postController().getPost(req, res));

module.exports = postRouter;

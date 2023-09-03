const express = require("express");
const userController = require("../controllers/user.controller.js");
const userRouter = express.Router();

userRouter
  .route("/login")
  .post((req, res) => new userController().login(req, res));

userRouter
  .route("/signup")
  .post((req, res) => new userController().signup(req, res));

userRouter
  .route("/checkUsername")
  .post((req, res) => new userController().checkUsername(req, res));

userRouter
  .route("/checkEmail")
  .post((req, res) => new userController().checkEmail(req, res));

userRouter
  .route("/findUserByUsername")
  .post((req, res) => new userController().findUserByUsername(req, res));

userRouter
  .route("/getStartedUpdate")
  .post((req, res) => new userController().getStartedUpdate(req, res));

userRouter
  .route("/searchByName")
  .post((req, res) => new userController().searchByName(req, res));

userRouter
  .route("/searchByUsername")
  .post((req, res) => new userController().searchByUsername(req, res));

userRouter
  .route("/addFriendRequest")
  .post((req, res) => new userController().addFriendRequest(req, res));

userRouter
  .route("/removeFriendRequest")
  .post((req, res) => new userController().removeFriendRequest(req, res));

userRouter
  .route("/addNotification")
  .post((req, res) => new userController().addNotification(req, res));

userRouter
  .route("/getAllNotifications")
  .post((req, res) => new userController().getAllNotifications(req, res));

userRouter
  .route("/getProfilePicture")
  .post((req, res) => new userController().getProfilePicture(req, res));

userRouter
  .route("/addFriend")
  .post((req, res) => new userController().addFriend(req, res));

userRouter
  .route("/updateUserData")
  .post((req, res) => new userController().updateUserData(req, res));

userRouter
  .route("/newPost")
  .post((req, res) => new userController().newPost(req, res));
module.exports = userRouter;

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
  .route("/lookByUsername")
  .post((req, res) => new userController().lookByUsername(req, res));

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

userRouter
  .route("/removeFriend")
  .post((req, res) => new userController().removeFriend(req, res));

userRouter
  .route("/rejectFriendRequest")
  .post((req, res) => new userController().rejectFriendRequest(req, res));

userRouter
  .route("/updateUsername")
  .post((req, res) => new userController().updateUsername(req, res));

userRouter
  .route("/updateEmail")
  .post((req, res) => new userController().updateEmail(req, res));

userRouter
  .route("/updatePassword")
  .post((req, res) => new userController().updatePassword(req, res));

userRouter
  .route("/deleteAccount")
  .post((req, res) => new userController().deleteAccount(req, res));

userRouter
  .route("/checkUsersEmail")
  .post((req, res) => new userController().checkUsersEmail(req, res));

userRouter
  .route("/leaveReview")
  .post((req, res) => new userController().leaveReview(req, res));

userRouter
  .route("/getAllReviews")
  .post((req, res) => new userController().getAllReviews(req, res));

userRouter
  .route("/getAllInformation")
  .post((req, res) => new userController().getAllInformation(req, res));

module.exports = userRouter;

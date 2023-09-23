const express = require("express");
const mongoose = require("mongoose");
const user = require("../models/user.js");
const post = require("../models/post.js");
const conversation = require("../models/conversation.js");
const message = require("../models/message.js");
const review = require("../models/review.js");

class UserController {
  login = (req, res) => {
    const { username, password } = req.body;
    user
      .findOne({ username: username, password: password })
      .then((user) => res.json(user))
      .catch((err) => console.log("Error finding user:", err));
  };
  signup = (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new user({
      _id: new mongoose.Types.ObjectId(),
      name: "",
      username: username,
      email: email,
      password: password,
      profilePicture: "",
      backgroundPicture: "",
      biography: "",
      city: "",
      country: "",
      birthday: "",
      instagram: "",
      facebook: "",
      tiktok: "",
      snapchat: "",
      verified: false,
    });
    newUser
      .save()
      .then((resolve) => res.json())
      .catch((error) => console.log(error));
  };
  checkUsername = (req, res) => {
    const { username } = req.body;
    user
      .findOne({ username: username })
      .then((user) => {
        if (user === null) res.json(false);
        else res.json(true);
      })
      .catch((err) => console.log("Error finding user:", err));
  };
  checkEmail = (req, res) => {
    const { email } = req.body;
    user
      .findOne({ email: email })
      .then((user) => {
        if (user === null) res.json(false);
        else res.json(true);
      })
      .catch((err) => console.log("Error finding user:", err));
  };
  findUserByUsername = (req, res) => {
    const { username } = req.body;
    user
      .findOne({ username: username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => console.log("Error finding user:", err));
  };
  getStartedUpdate = (req, res) => {
    const { username, name, birthday, city, country, image } = req.body;
    const query = { username: username };
    const update = {
      name: name,
      birthday: birthday,
      city: city,
      profilePicture: image,
      backgroundPicture:
        "https://firebasestorage.googleapis.com/v0/b/socialsphere-2023.appspot.com/o/background.jpg?alt=media&token=d2a791c7-3025-4fd1-ab5e-361ee81f4bfa",
      country: country,
      verified: true,
    };
    user
      .findOneAndUpdate(query, update, { new: true })
      .then((result) => res.json(result))
      .catch((error) => console.log(error));
  };
  searchByName = (req, res) => {
    const name = req.body.parameter;
    user
      .find({ name: { $regex: name, $options: "i" } })
      .then((result) => {
        //res.json(result);
        let users = [];
        for (let i = 0; i < result.length; i++) {
          const obj = {
            name: result[i].name,
            profilePicture: result[i].profilePicture,
            username: result[i].username,
          };
          users.push(obj);
        }
        res.json(users);
      })
      .catch((error) => console.log(error));
  };

  lookByUsername = (req, res) => {
    const username = req.body.parameter;
    user
      .find({ username: { $regex: username, $options: "i" } })
      .then((result) => {
        //res.json(result);
        let users = [];
        for (let i = 0; i < result.length; i++) {
          const obj = {
            name: result[i].name,
            profilePicture: result[i].profilePicture,
            username: result[i].username,
          };
          users.push(obj);
        }
        res.json(users);
      })
      .catch((error) => console.log(error));
  };

  searchByUsername = (req, res) => {
    const username = req.body.username;
    console.log(username);
    user
      .findOne({ username: username })
      .then((result) => {
        if (result) {
          let obj = {
            name: result.name,
            username: result.username,
            profilePicture: result.profilePicture,
          };
          res.json(obj);
        }
      })
      .catch((error) => console.log(error));
  };
  addFriendRequest = (req, res) => {
    const { myUsername, friendUsername } = req.body;

    const query_me = { username: myUsername };
    const update_me = { $push: { myRequests: friendUsername } };
    const query_friend = { username: friendUsername };
    const update_friend = { $push: { friendRequests: myUsername } };
    user
      .findOneAndUpdate(query_me, update_me, { new: true })
      .then((result) => {
        user
          .findOneAndUpdate(query_friend, update_friend, { new: true })
          .then((result) => res.json(result))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  removeFriendRequest = (req, res) => {
    const { myUsername, friendUsername } = req.body;
    const query_me = { username: myUsername };
    const update_me = { $pull: { myRequests: friendUsername } };
    const query_friend = { username: friendUsername };
    const update_friend = { $pull: { friendRequests: myUsername } };
    user
      .findOneAndUpdate(query_me, update_me, { new: true })
      .then((result) => {
        user
          .findOneAndUpdate(query_friend, update_friend, { new: true })
          .then((result) => res.json(result))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  rejectFriendRequest = (req, res) => {
    const { myUsername, friendUsername } = req.body;
    const query_me = { username: myUsername };
    const update_me = { $pull: { friendRequests: friendUsername } };
    const query_friend = { username: friendUsername };
    const update_friend = { $pull: { myRequests: myUsername } };
    user
      .findOneAndUpdate(query_me, update_me, { new: true })
      .then((result) => {
        user
          .findOneAndUpdate(query_friend, update_friend, { new: true })
          .then((result) => res.json(result))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  addNotification = async (req, res) => {
    const { username, type } = req.body;
    let text = "";
    switch (type) {
      case 1:
        text = "has accepted your friend request.";
        break;
      case 2:
        text = "has liked your post.";
        break;
      case 3:
        text = "has commented your post.";
        break;
      case 4:
        text = "has posted something new.";
        break;
      default:
        break;
    }
    const newNotification = {
      sender: username,
      text: text,
    };
    const filter = { username: username };
    try {
      const thisUser = await user.findOne(filter);
      for (let i = 0; i < thisUser.friends.length; i++) {
        const friend = thisUser.friends[i];
        const filter_notification = { username: friend };
        const update_notification = {
          $push: { notifications: newNotification },
        };
        await user.findOneAndUpdate(filter_notification, update_notification);
      }
      res.json();
    } catch (error) {
      console.log(error);
    }
  };

  getAllNotifications = async (req, res) => {
    const { username } = req.body;
    try {
      const oneUser = await user.findOne({ username: username });
      res.json(oneUser.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  getProfilePicture = (req, res) => {
    const { username } = req.body;
    const query = { username: username };
    user
      .findOne(query)
      .then((result) => res.json(result?.profilePicture))
      .catch((error) => console.log(error));
  };

  addFriend = (req, res) => {
    const { myUsername, friendUsername } = req.body;
    const filter_myData = { username: myUsername };
    const update_myData = {
      $pull: {
        friendRequests: friendUsername,
      },
      $push: {
        friends: friendUsername,
      },
    };
    const filter_friendData = { username: friendUsername };
    const update_friendData = {
      $pull: {
        myRequests: myUsername,
      },
      $push: {
        friends: myUsername,
      },
    };
    user
      .findOneAndUpdate(filter_myData, update_myData, { new: true })
      .then((result) => {
        user
          .findOneAndUpdate(filter_friendData, update_friendData, { new: true })
          .then((result) => {})
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  updateUserData = (req, res) => {
    const {
      username,
      profilePicture,
      backgroundPicture,
      name,
      birthday,
      city,
      country,
      biography,
      instagram,
      facebook,
      twitter,
      tiktok,
      snapchat,
    } = req.body;
    const filter = { username: username };
    const update = {
      profilePicture: profilePicture,
      backgroundPicture: backgroundPicture,
      name: name,
      birthday: birthday,
      city: city,
      country: country,
      biography: biography,
      instagram: instagram,
      facebook: facebook,
      twitter: twitter,
      tiktok: tiktok,
      snapchat: snapchat,
    };
    const options = { new: true };
    user
      .findOneAndUpdate(filter, update, options)
      .then((result) => {})
      .catch((error) => console.log(error));
  };
  removeFriend = (req, res) => {
    const { myUsername, friendUsername } = req.body;
    const query_me = { username: myUsername };
    const update_me = { $pull: { friends: friendUsername } };
    const query_friend = { username: friendUsername };
    const update_friend = { $pull: { friends: myUsername } };
    user
      .findOneAndUpdate(query_me, update_me, { new: true })
      .then((result) => {
        user
          .findOneAndUpdate(query_friend, update_friend, { new: true })
          .then((result) => res.json(result))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  updateUsername = (req, res) => {
    const { username, newUsername } = req.body;
    const filter = { username: username };
    const update = { username: newUsername };
    user
      .findOneAndUpdate(filter, update)
      .then(() => res.json())
      .catch((error) => console.log(error));
  };

  updateEmail = (req, res) => {
    const { username, newEmail } = req.body;
    const filter = { username: username };
    const update = { email: newEmail };
    user
      .findOneAndUpdate(filter, update)
      .then(() => res.json())
      .catch((error) => console.log(error));
  };

  updatePassword = (req, res) => {
    const { username, newPassword } = req.body;
    const filter = { username: username };
    const update = { password: newPassword };
    user
      .findOneAndUpdate(filter, update)
      .then(() => res.json())
      .catch((error) => console.log(error));
  };

  deleteAccount = async (req, res) => {
    const { username } = req.body;
    try {
      const filter = { username: username };
      await post.deleteMany(filter);
      const filter_conversation = { members: { $in: [username] } };
      const conversations = await conversation.find(filter_conversation);
      for (let i = 0; i < conversations.length; i++) {
        const conv = conversations[i];
        const conversationID = conv._id;
        const filter_message = { conversationID: conversationID };
        await message.deleteMany(filter_message);
      }
      await conversation.deleteMany(filter_conversation);
      await user.findOneAndDelete(filter);
      res.json();
    } catch (error) {
      console.log(error);
    }
  };

  checkUsersEmail = async (req, res) => {
    const { username, email } = req.body;
    console.log(username + " " + email);
    const filter = { username: username, email: email };
    try {
      const oneUser = await user.findOne(filter);
      if (oneUser !== null) res.json(true);
      else res.json(false);
    } catch (error) {
      console.log(error);
    }
  };

  leaveReview = (req, res) => {
    const { rating, title, comment, name, username, profilePicture } = req.body;
    console.log(rating);
    const _id = new mongoose.Types.ObjectId();
    let newReview = new review({
      _id: _id,
      rating: rating,
      title: title,
      comment: comment,
      author: name,
      username: username,
      profilePicture: profilePicture,
    });
    newReview
      .save()
      .then(() => {
        res.json();
      })
      .catch((err) => console.log(err));
  };

  getAllReviews = (req, res) => {
    review
      .find({})
      .then((result) => res.json(result))
      .catch((error) => console.log(error));
  };

  getAllInformation = async (req, res) => {
    let usersNum = 0;
    let postsNum = 0;
    let likesNum = 0;
    let commentsNum = 0;
    const users = await user.find({});
    usersNum = users.length;
    const posts = await post.find({});
    postsNum = posts.length;
    posts.forEach((p) => {
      likesNum += p.likes.length;
      commentsNum += p.comments.length;
    });
    res.json({ usersNum, postsNum, likesNum, commentsNum });
  };
}

module.exports = UserController;

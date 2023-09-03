const express = require("express");
const mongoose = require("mongoose");
const user = require("../models/user.js");
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
  searchByUsername = (req, res) => {
    const username = req.body.username;
    user
      .findOne({ username: username })
      .then((result) => {
        let obj = {
          name: result.name,
          username: result.username,
          profilePicture: result.profilePicture,
        };
        res.json(obj);
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
  addNotification = (req, res) => {
    const { username, myUsername } = req.body;
    const query = { username: myUsername };
    const update = {
      $push: {
        notifications: {
          sender: username,
          text: "has accepted your friend request.",
        },
      },
    };
    user
      .findOneAndUpdate(query, update, { new: true })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };
  getAllNotifications = (req, res) => {
    const { username } = req.body;
  };

  getProfilePicture = (req, res) => {
    const { username } = req.body;
    const query = { username: username };
    user
      .findOne(query)
      .then((result) => res.json(result.profilePicture))
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
}

module.exports = UserController;

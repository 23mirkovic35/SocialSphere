const express = require("express");
const mongoose = require("mongoose");
const group = require("../models/group.js");
class GroupController {
  createGroup = (req, res) => {
    const { myUsername, name } = req.body;
    console.log("MRIEMFGPEIMFPEMGPEFMO");
    const newGroup = new group({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      admins: [myUsername],
      members: [],
      posts: [],
    });
    newGroup
      .save()
      .then((resolve) => res.json(resolve))
      .catch((error) => console.log(error));
  };
  getUserGroups = (req, res) => {
    const { username } = req.body;
    group
      .find({
        $or: [{ admins: username }, { members: username }],
      })
      .then((groups) => res.json(groups))
      .catch((error) => console.log(error));
  };

  getAllGroups = (req, res) => {
    const { username } = req.body;
    group
      .find({
        $and: [{ admins: { $ne: username } }, { members: { $ne: username } }],
      })
      .then((groups) => res.json(groups))
      .catch((error) => console.log(error));
  };

  joinGroup = (req, res) => {
    const { username, groupId } = req.body;
    const filter = { _id: groupId };
    const update = {
      $push: {
        members: username,
      },
    };
    group
      .findOneAndUpdate(filter, update)
      .then((data) => res.json(data))
      .catch((error) => console.log(error));
  };

  getGroupData = (req, res) => {
    const { groupId } = req.body;
    const filter = { _id: groupId };
    group
      .findOne(filter)
      .then((data) => res.json(data))
      .catch((error) => console.log(error));
  };

  newPost = (req, res) => {
    const { username, name, type, text, images, videos, date, groupId } =
      req.body;
    const filter = { _id: groupId };
    const newPostObj = {
      _id: new mongoose.Types.ObjectId(),
      username: username,
      name: name,
      type: type,
      text: text,
      images: images,
      videos: videos,
      likes: [],
      comments: [],
      time: date,
    };

    const update = {
      $push: {
        posts: newPostObj,
      },
    };
    group
      .findOneAndUpdate(filter, update)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };
}

module.exports = GroupController;

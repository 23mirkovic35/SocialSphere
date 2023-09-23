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
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  };
  updatePostLikes = (req, res) => {
    const { likes, _id, groupId } = req.body;
    console.log(likes + " " + _id + " " + groupId);
    const filter = {
      _id: groupId,
    };
    group
      .findOne(filter)
      .then((result) => {
        let posts = result.posts;
        const index = posts.findIndex(
          (post) => post._id.toString() === _id.toString()
        );

        posts[index].likes = likes;
        const update = { posts: posts };
        group
          .findOneAndUpdate(filter, update)
          .then((result) => {
            /*console.log(result)*/
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  updatePostComments = (req, res) => {
    const { groupId, _id, comments } = req.body;
    const filter = {
      _id: groupId,
    };
    group
      .findOne(filter)
      .then((result) => {
        let posts = result.posts;
        const index = posts.findIndex(
          (post) => post._id.toString() === _id.toString()
        );

        posts[index].comments = comments;
        const update = { posts: posts };
        group
          .findOneAndUpdate(filter, update)
          .then((result) => {
            res.json();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
}

module.exports = GroupController;

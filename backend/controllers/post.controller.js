const express = require("express");
const mongoose = require("mongoose");
const post = require("../models/post.js");
class PostController {
  newPost = (req, res) => {
    const { username, name, type, text, images, videos, time } = req.body;
    const insert = {
      _id: new mongoose.Types.ObjectId(),
      username: username,
      name: name,
      type: type,
      text: text,
      images: images,
      videos: videos,
      likes: [],
      comments: [],
      time: new Date(),
    };
    const newPost = new post(insert);
    newPost
      .save()
      .then((resolve) => res.json())
      .catch((error) => console.log(error));
  };
  getPosts = (req, res) => {
    const { username, friends } = req.body;
    const posts = [];
    const myPosts = { username: username };
    post
      .find(myPosts)
      .then((myPostsResult) => {
        for (let i = 0; i < myPostsResult.length; i++) {
          posts.push(myPostsResult[i]);
        }

        const friendPromises = friends.map((friend) => {
          const friendPost = { username: friend };
          return post.find(friendPost).then((friendPostsResult) => {
            for (let i = 0; i < friendPostsResult.length; i++) {
              posts.push(friendPostsResult[i]);
            }
          });
        });

        return Promise.all(friendPromises);
      })
      .then(() => {
        posts.sort((a, b) => {
          const timeA = new Date(a.time);
          const timeB = new Date(b.time);

          if (timeA < timeB) {
            return 1;
          } else if (timeA > timeB) {
            return -1;
          } else {
            return 0;
          }
        });
        res.json(posts);
      })
      .catch((error) => {
        console.error(error);
        // res.status(500).json({ error: "Internal Server Error" });
      });
  };
  updateLikes = (req, res) => {
    const { _id, likes } = req.body;
    console.log("MIRE");
    const filter = { _id: _id };
    const update = { likes: likes };
    post
      .findOneAndUpdate(filter, update, { new: true })
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  updateComments = (req, res) => {
    const { _id, comments } = req.body;
    const filter = { _id: _id };
    const update = { comments: comments };
    post
      .findOneAndUpdate(filter, update, { new: true })
      .then((result) => res.json())
      .catch((error) => {
        console.log(error);
      });
  };
  userPosts = (req, res) => {
    const { username } = req.body;
    const filter = { username: username };
    post
      .find(filter)
      .then((posts) => res.json(posts))
      .catch((error) => console.log(error));
  };
  getUserImages = (req, res) => {
    const { username } = req.body;
    const filter = { username: username };
    post
      .find(filter)
      .then((posts) => {
        let images = [];
        posts.forEach((post) => {
          if (post.type === 1) {
            images.push(...post.images);
          }
        });
        res.json(images);
      })
      .catch((error) => console.log(error));
  };

  getPost = (req, res) => {
    const postId = req.body._id;
    const _id = postId.postId;
    const filter = { _id: _id };
    post
      .findOne(filter)
      .then((data) => res.json(data))
      .catch((error) => console.log(error));
  };
}

module.exports = PostController;

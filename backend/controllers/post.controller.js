const express = require("express");
const mongoose = require("mongoose");
const post = require("../models/post.js");
class PostController {
  newPost = (req, res) => {
    console.log(req.body);
    const { username, name, type, text, images, videos, date } = req.body;
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
      time: date,
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
}

module.exports = PostController;

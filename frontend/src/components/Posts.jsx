import React, { useEffect, useState } from "react";
import "../styles/Posts.css";
import Post from "./Post";
import axios from "axios";

export default function Posts({ myUsername, friends, socket }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (myUsername !== undefined) {
      axios
        .post("http://localhost:5000/posts/getPosts", {
          username: myUsername,
          friends: friends,
        })
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [myUsername]);

  return (
    <div className="Posts">
      {posts.map((post, index) => {
        return <Post post={post} />;
      })}
    </div>
  );
}

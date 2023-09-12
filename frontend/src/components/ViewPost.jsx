import React, { useEffect, useState } from "react";
import "../styles/ViewPost.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from "./Post";
import { useUserAndSocket } from "../pages/MySphere";

export default function ViewPost() {
  const { myData, socket } = useUserAndSocket();
  const postId = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    if (typeof postId !== "undefined") {
      const data = { _id: postId };
      axios
        .post("http://localhost:5000/posts/getPost", data)
        .then((res) => setPost(res.data))
        .catch((error) => console.log(error));
    }
  }, [postId]);
  return (
    <div className="ViewPost">
      <div className="wrapper">
        {" "}
        {post && (
          <Post post={post} myUsername={myData.myUsername} socket={socket} />
        )}
      </div>
    </div>
  );
}

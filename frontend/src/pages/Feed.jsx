import React, { useState } from "react";
import "../styles/Feed.css";
import { useUserAndSocket } from "./MySphere";
import NewPostInput from "../components/NewPostInput";
import Posts from "../components/Posts";
import NewPost from "../components/NewPost";

function Feed() {
  const { myData, socket } = useUserAndSocket();
  const [newPosts, setNewPosts] = useState([]);
  const post = {
    username: "mmirkovic99",
    type: 0,
    text: "Cao svima <3",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/socialsphere-2023.appspot.com/o/DSC_6016.JPG?alt=media&token=8172283f-e5af-4d4c-94da-bbfea9182193",
    ],
    videos: [],
    videos: [],
    likes: [],
    comments: [],
    time: new Date(),
  };
  return (
    <div className="Feed">
      <NewPostInput myData={myData} socket={socket} setNewPosts={setNewPosts} />
      {newPosts.map((post, index) => (
        <NewPost post={post} socket={socket} myData={myData} />
      ))}
      <Posts
        myUsername={myData.username}
        friends={myData.friends}
        socket={socket}
      />
    </div>
  );
}

export default Feed;

import React, { useState } from "react";
import "../styles/Feed.css";
import { useUserAndSocket } from "./MySphere";
import NewPostInput from "../components/NewPostInput";
import Posts from "../components/Posts";
import NewPost from "../components/NewPost";

function Feed() {
  const { myData, socket } = useUserAndSocket();
  const [newPosts, setNewPosts] = useState([]);
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

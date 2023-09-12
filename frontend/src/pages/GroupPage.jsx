import React, { useEffect, useState } from "react";
import { useUserAndSocket } from "./MySphere";
import { useParams } from "react-router-dom";
import axios from "axios";
import NewPostInput from "../components/NewPostInput";
import Post from "../components/Post";
import NewPost from "../components/NewPost";

export default function GroupPage() {
  const { myData, socket } = useUserAndSocket();
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [newPosts, setNewPosts] = useState([]);

  useEffect(() => {
    if (typeof myData !== "undefined") {
    }
  }, [myData]);

  useEffect(() => {
    if (typeof postId === "undefined") {
      const data = {
        groupId: groupId,
      };
      axios
        .post("http://localhost:5000/groups/getGroupData", data)
        .then((res) => {
          setGroupData(res.data);
        });
    }
  }, [groupId]);

  useEffect(() => {
    if (
      groupData &&
      groupData.admins.some((user) => user === myData.username)
    ) {
      setIsAdmin(true);
    }
  }, [groupData]);

  return (
    <div className="GroupPage">
      {groupData && (
        <div className="page-header">
          <div className="title">Welcome to {groupData.name}</div>
          <div className="post-number">
            <span className="dot"></span>
            {groupData && (
              <div className="text">{groupData.posts.length} posts</div>
            )}
            <span className="dot"></span>
          </div>
        </div>
      )}
      <div className="posts">
        <NewPostInput
          myData={myData}
          socket={socket}
          setNewPosts={setNewPosts}
          isGroup={true}
          groupId={groupId}
        />
        {newPosts.map((post, index) => (
          <NewPost post={post} socket={socket} myData={myData} />
        ))}
        {groupData &&
          groupData.posts.map((post, index) => (
            <Post post={post} myUsername={myData.username} socket={socket} />
          ))}
      </div>
    </div>
  );
}

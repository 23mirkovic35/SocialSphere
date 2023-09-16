import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Conversation.css";
export default function Conversation({
  myUsername,
  conversationData,
  setSelectedConversation,
}) {
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [friendUsername, setFriendUsername] = useState("");
  const [lastMessage, setLastMessage] = useState({});

  useEffect(() => {
    if (conversationData) {
      setFriendUsername(
        conversationData.members.find((member) => member !== myUsername)
      );
      const data = {
        _id: conversationData.lastMessage,
      };
      axios
        .post("http://localhost:5000/messages/getMessage", data)
        .then((result) => setLastMessage(result.data))
        .catch((error) => console.log(error));
    }
  }, [conversationData]);

  useEffect(() => {
    if (friendUsername) {
      const data = { username: friendUsername };
      axios
        .post("http://localhost:5000/users/searchByUsername", data)
        .then((result) => {
          setName(result.data.name);
          setProfilePicture(result.data.profilePicture);
        })
        .catch((error) => console.log(error));
    }
  }, [friendUsername]);

  return (
    <div
      className="Conversation"
      onClick={() => setSelectedConversation(conversationData)}
    >
      <img src={profilePicture} />
      <div className="other">
        <div className="header">
          <div className="name">{name}</div>
          <div className="time"></div>
        </div>
        <div className="last-message">{lastMessage.text}</div>
      </div>
    </div>
  );
}

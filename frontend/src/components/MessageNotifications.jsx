import React, { useEffect, useState } from "react";
import "../styles/MessageNotifications.css";
import axios from "axios";
import Conversation from "./Conversation";

export default function MessageNotifications({ socket, myData, setPopup }) {
  const [conversations, setConversations] = useState([]);
  const [myUsername, setMyUsername] = useState("");

  const getMessages = () => {
    const cbMessages = document.getElementById("cb_msgBox");
    if (!cbMessages.checked) {
      const username = localStorage.getItem("user");
      getConversationsData(username);
      setMyUsername(username);
    }
  };

  const getConversationsData = (username) => {
    const data = {
      username: username,
    };
    axios
      .post("http://localhost:5000/conversations/getConversations", data)
      .then((result) => {
        setConversations(result.data);
      })
      .catch((error) => console.log(error));
  };

  const setSelectedConversation = () => {};

  const showAllMessages = () => {
    window.location.href = `http://localhost:3000/mySphere/messages/${myUsername}`;
  };

  return (
    <div className="MessageNotifications">
      <input type="checkbox" name="cb_msgBox" id="cb_msgBox" />
      <label htmlFor="cb_msgBox" onClick={() => getMessages()}>
        <svg
          id="svg_messageBox"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z"
              stroke="#FFFFFF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </label>
      <div className="messages-box">
        <div className="title">
          <div className="text">Conversations</div>
          <div className="other">
            <span className="unread-msg"></span>
            {conversations.length !== 1 && (
              <div className="number">{conversations.length} conversations</div>
            )}
            {conversations.length === 1 && (
              <div className="number">1 conversation</div>
            )}
          </div>
        </div>
        <div className="messages">
          {conversations.map((conversation, index) => (
            <Conversation
              setSelectedConversation={setSelectedConversation}
              key={index}
              myUsername={myUsername}
              conversationData={conversation}
              type={0}
            />
          ))}
        </div>
        <div className="show-all" onClick={() => showAllMessages()}>
          Show All
        </div>
      </div>
    </div>
  );
}

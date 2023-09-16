import React, { useEffect, useState } from "react";
import "../styles/MessagesSideBar.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Conversation from "./Conversation";

export default function MessagesSideBar({ setSelectedConversation, socket }) {
  const { username } = useParams();
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    if (username) {
      getData();
    }
  }, [username]);

  useEffect(() => {
    if (socket) {
      socket.on("getNewMessage", ({ sender, receiver, message }) => {
        getData();
      });
    }
  }, [socket]);

  const getData = () => {
    const data = {
      username: username,
    };
    axios
      .post("http://localhost:5000/conversations/getConversations", data)
      .then((result) => setConversations(result.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="MessagesSideBar">
      <div className="title">
        <div className="text">Chats</div>
        <div className="new-conversation">
          <svg
            height={20}
            width={20}
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
                d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </div>
      </div>
      <div className="search-box">
        <svg
          height={20}
          width={20}
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
              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              stroke="#a1a1a1"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
        <input
          type="text"
          name="conversation-search"
          id="conversation-search"
          placeholder="Search..."
        />
      </div>
      {conversations.map((conversation, index) => (
        <Conversation
          setSelectedConversation={setSelectedConversation}
          key={index}
          myUsername={username}
          conversationData={conversation}
        />
      ))}
    </div>
  );
}

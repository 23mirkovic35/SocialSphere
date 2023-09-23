import React, { useEffect, useState } from "react";
import "../styles/MessagesSideBar.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Conversation from "./Conversation";

export default function MessagesSideBar({
  setSelectedConversation,
  socket,
  myData,
}) {
  const { username } = useParams();
  const [conversations, setConversations] = useState([]);
  const [newConversation, setNewConversation] = useState(false);
  const [friendsData, setFriendsData] = useState([]);
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
      socket.on("updateConversation", () => {
        getData();
      });
    }
  }, [socket]);

  useEffect(() => {
    if (myData && myData.friends) {
      for (let i = 0; i < myData.friends.length; i++) {
        axios
          .post("http://localhost:5000/users/searchByusername", {
            username: myData.friends[i],
          })
          .then((response) => {
            setFriendsData((prevData) => {
              if (!prevData.some((u) => u.username === response.data.username))
                return [...prevData, response.data];
              return prevData;
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  }, [myData]);

  const getData = () => {
    const data = {
      username: username,
    };
    axios
      .post("http://localhost:5000/conversations/getConversations", data)
      .then((result) => setConversations(result.data))
      .catch((error) => console.log(error));
  };

  const createConversation = () => {
    setNewConversation(true);
  };

  const selectConversation = (username) => {
    const conversation = conversations.find((conversation) =>
      conversation.members.includes(username)
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setNewConversation(false);
    } else {
      axios
        .post("http://localhost:5000/conversations/createConversation", {
          members: [username, myData.username],
        })
        .then((result) => {
          setSelectedConversation(result.data);
          setNewConversation(false);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="MessagesSideBar">
      <div className="title">
        <div className="text">Chats</div>
        <div
          className="new-conversation"
          onClick={() => {
            createConversation();
          }}
        >
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
      {newConversation && (
        <div className="newConversation-container">
          <div className="wrapper">
            <div className="header">
              <div className="title-text">Create conversation</div>
              <svg
                onClick={() => {
                  setNewConversation(false);
                }}
                height={25}
                width={25}
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
                    d="M16 8L8 16M8 8L16 16"
                    stroke="#a1a1a1"
                    stroke-width="2"
                    stroke-linecap="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            {friendsData.map((friend, index) => (
              <div className="friend-data">
                <div className="user-data">
                  {" "}
                  <img src={friend.profilePicture} className="friend-pic" />
                  <div className="user-info">
                    <div className="name">{friend.name}</div>
                    <div className="username">@{friend.username}</div>
                  </div>
                </div>
                <svg
                  onClick={() => {
                    selectConversation(friend.username);
                  }}
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
                      d="M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z"
                      stroke="#a1a1a1"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import "../styles/ChatBox.css";

import NewMessageInput from "./NewMessageInput";
import axios from "axios";
import { useParams } from "react-router-dom";
import Message from "./Message";

export default function ChatBox({
  selectedConversation,
  socket,
  setShowConversationData,
}) {
  const chatBoxRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const { username } = useParams();
  const [newMessages, setNewMessages] = useState([]);
  const [friendUsername, setFriendUsername] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    if (selectedConversation) {
      setFriendUsername(
        selectedConversation.members.find((member) => member !== username)
      );
      const data = { conversationID: selectedConversation._id };
      axios
        .post("http://localhost:5000/messages/getMessages", data)
        .then((result) => setMessages(result.data))
        .catch((error) => console.log(error));
    }
  }, [selectedConversation]);

  useEffect(() => {
    if (socket) {
      socket.on("getNewMessage", ({ sender, receiver, message }) => {
        setNewMessages((prev) => {
          if (
            !prev.some(
              (newMessage) =>
                newMessage.time === message.time &&
                message.type === newMessage.type &&
                newMessage.text === message.text
            )
          )
            return [...prev, message];
          return prev;
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    const data = { username: friendUsername };
    axios
      .post("http://localhost:5000/users/searchByUsername", data)
      .then((result) => {
        setUser(result.data);
        console.log(user);
      })
      .catch((error) => console.log(error));
  }, [friendUsername]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, newMessages]);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const showMore = () => {
    setShowConversationData(true);
  };

  return (
    <div className="ChatBox">
      {user && (
        <div className="chat-header">
          <div className="left-side">
            <img src={user.profilePicture} id="titleprofilePicture" alt="" />
            <div className="user-info">
              <div className="name">{user.name}</div>
              <div className="username">@{user.username}</div>
            </div>
          </div>
          <div className="right-side">
            <button className="call">
              <svg
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
                    d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z"
                    stroke="#a1a1a1"
                    stroke-width="2.016"
                    stroke-linecap="round"
                  ></path>{" "}
                </g>
              </svg>
            </button>
            <button className="video-call">
              <svg
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
                    d="M16 10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 15.099 21 15.5615 20.806 15.8257C20.6369 16.056 20.3773 16.203 20.0928 16.2295C19.7665 16.2599 19.3699 16.022 18.5768 15.5461L16 14M6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C16 16.4802 16 15.9201 16 14.8V9.2C16 8.0799 16 7.51984 15.782 7.09202C15.5903 6.71569 15.2843 6.40973 14.908 6.21799C14.4802 6 13.9201 6 12.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z"
                    stroke="#a1a1a1"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </button>
            <button className="more" onClick={() => showMore()}>
              <svg
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
                  <g id="Warning / Info">
                    {" "}
                    <path
                      id="Vector"
                      d="M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z"
                      stroke="#a1a1a1"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>{" "}
                </g>
              </svg>
            </button>
          </div>
        </div>
      )}
      <span className="horizontal-line"></span>
      <div className="chat" ref={chatBoxRef}>
        {messages.map((message, index) => (
          <Message myUsername={username} message={message} />
        ))}
        {newMessages.map((message, index) => (
          <Message myUsername={username} message={message} />
        ))}
      </div>
      <span className="horizontal-line"></span>
      <NewMessageInput
        setNewMessages={setNewMessages}
        conversationID={selectedConversation._id}
        socket={socket}
        friendUsername={friendUsername}
      />
    </div>
  );
}

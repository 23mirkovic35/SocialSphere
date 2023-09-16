import React, { useEffect, useState } from "react";
import EmojiSelector from "./EmojiSelector";
import "../styles/NewMessageInput.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function NewMessageInput({
  setNewMessages,
  conversationID,
  socket,
  friendUsername,
}) {
  const [text, setText] = useState("");

  const { username } = useParams();

  const handleNewMessage = () => {
    const newMessage = {
      senderID: username,
      type: "text",
      text: text,
      images: [],
      videos: [],
      time: new Date(),
      conversationID: conversationID,
    };
    setNewMessages((prevMessages) => {
      if (
        !prevMessages.some(
          (message) =>
            message.time === newMessage.time &&
            message.text === newMessage.text &&
            message.senderID === newMessage.senderID
        )
      )
        return [...prevMessages, newMessage];
      return prevMessages;
    });
    setText("");
    axios
      .post("http://localhost:5000/messages/saveMessage", newMessage)
      .then((result) => {
        socket.emit("newMessage", {
          sender: username,
          receiver: friendUsername,
          message: newMessage,
        });
      })
      .catch((error) => console.log(error));
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="NewMessageInput">
      <div className="options">
        <EmojiSelector setText={setText} />
        <div className="files">
          <input type="checkbox" name="cb_fiels" id="cb_fiels" />
          <label htmlFor="cb_fiels">
            <svg
              height="25px"
              width="25px"
              fill="#a1a1a1"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 511.999 511.999"
              stroke="#a1a1a1"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M466.904,68.854c-60.129-60.127-157.962-60.127-218.091,0L35.373,282.294c-47.166,47.167-47.161,123.497,0,170.659 c47.053,47.051,123.609,47.049,170.659,0l213.441-213.442c33.973-33.973,33.973-89.254,0-123.228 c-33.974-33.974-89.254-33.974-123.228,0L114.204,298.327c-7.833,7.833-7.833,20.532,0,28.365c7.833,7.833,20.531,7.833,28.365,0 L324.61,144.65c18.333-18.336,48.164-18.334,66.497,0c18.333,18.334,18.333,48.165,0,66.498l-213.44,213.441 c-31.412,31.41-82.519,31.41-113.93,0c-31.487-31.487-31.484-82.445,0-113.929L277.179,97.219 c44.595-44.596,116.77-44.59,161.36,0c44.596,44.595,44.59,116.77,0,161.36l-94.863,94.863c-7.833,7.833-7.833,20.532,0,28.365 c7.834,7.833,20.531,7.833,28.365,0l94.863-94.863C527.031,226.817,527.031,128.981,466.904,68.854z"></path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </label>
          <ul>
            <li>
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
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4Z"
                    fill="#0F0F0F"
                  ></path>{" "}
                  <path
                    d="M4.80665 17.5211L9.1221 9.60947C9.50112 8.91461 10.4989 8.91461 10.8779 9.60947L14.0465 15.4186L15.1318 13.5194C15.5157 12.8476 16.4843 12.8476 16.8682 13.5194L19.1451 17.5039C19.526 18.1705 19.0446 19 18.2768 19H5.68454C4.92548 19 4.44317 18.1875 4.80665 17.5211Z"
                    fill="#0F0F0F"
                  ></path>{" "}
                  <path
                    d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z"
                    fill="#0F0F0F"
                  ></path>{" "}
                </g>
              </svg>
              <div className="text">Image</div>
            </li>
            <li>
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
                    d="M16 10L18.5768 8.45392C19.3699 7.97803 19.7665 7.74009 20.0928 7.77051C20.3773 7.79703 20.6369 7.944 20.806 8.17433C21 8.43848 21 8.90095 21 9.8259V14.1741C21 15.099 21 15.5615 20.806 15.8257C20.6369 16.056 20.3773 16.203 20.0928 16.2295C19.7665 16.2599 19.3699 16.022 18.5768 15.5461L16 14M6.2 18H12.8C13.9201 18 14.4802 18 14.908 17.782C15.2843 17.5903 15.5903 17.2843 15.782 16.908C16 16.4802 16 15.9201 16 14.8V9.2C16 8.0799 16 7.51984 15.782 7.09202C15.5903 6.71569 15.2843 6.40973 14.908 6.21799C14.4802 6 13.9201 6 12.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <div className="text">Video</div>
            </li>
            <li>
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
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V4C19 3.44772 18.5523 3 18 3ZM6.41421 7H9V4.41421L6.41421 7ZM7 13C7 12.4477 7.44772 12 8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13ZM7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>
              <div className="text">Document</div>
            </li>
          </ul>
        </div>
      </div>
      <input
        type="text"
        name="new-message"
        id="newMessage"
        placeholder="Type message ..."
        onChange={handleTextChange}
        value={text}
      />
      <button
        className="send"
        onClick={() => {
          handleNewMessage();
        }}
      >
        <svg
          height={40}
          width={40}
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
              d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </button>
    </div>
  );
}

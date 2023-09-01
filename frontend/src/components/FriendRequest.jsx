import React from "react";
import "../styles/FriendRequest.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function FriendRequest(props) {
  const navigator = useNavigate();
  const { name, username, profilePicture, socket } = props;

  const handleAccpet = () => {
    const myUsername = localStorage.getItem("user");
    socket.emit("acceptFriendRequest", {
      sender: myUsername,
      receiver: username,
    });
    DB_updateUsers(myUsername, username);
  };

  const visitProfile = () => {
    navigator(`/mySphere/profile/${username}`);
  };

  async function DB_updateUsers(myUsername, friendUsername) {
    const response = await axios.post("http://localhost:5000/users/addFriend", {
      myUsername: myUsername,
      friendUsername: friendUsername,
    });
  }

  return (
    <div className="FriendRequest">
      <img src={profilePicture} alt="" />
      <div className="other">
        <div className="user-info" onClick={visitProfile}>
          <div className="user-name">{name}</div>
          <div className="user-username">@{username}</div>
        </div>
        <div className="btn-container">
          <button id="accept" onClick={handleAccpet}>
            <svg
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
                  d="M4 12.6111L8.92308 17.5L20 6.5"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
          <button id="reject">
            <svg
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
                <g clip-path="url(#clip0_429_10978)">
                  {" "}
                  <path
                    d="M16.9999 7.00004L6.99994 17"
                    stroke="#ffffff"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M7.00006 7.00003L17.0001 17"
                    stroke="#ffffff"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>{" "}
                <defs>
                  {" "}
                  <clipPath id="clip0_429_10978">
                    {" "}
                    <rect width="24" height="24" fill="white"></rect>{" "}
                  </clipPath>{" "}
                </defs>{" "}
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

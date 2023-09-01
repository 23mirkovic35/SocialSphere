import React, { useEffect, useState } from "react";
import "../styles/FriendRequestNotification.css";
import FriendRequest from "./FriendRequest";
import axios from "axios";

export default function FriendRequestNotification(props) {
  const { socket, myData, setPopup } = props;
  const [friendRequestsNumber, setFriendRequestsNumber] = useState(0);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (myData.friendRequests !== undefined) {
      setFriendRequestsNumber(myData.friendRequests.length);
      if (myData.friendRequests.length !== 0)
        for (let i = 0; i < myData.friendRequests.length; i++) {
          DB_getData(myData.friendRequests[i]);
        }
    }
  }, [myData]);

  useEffect(() => {
    const redDot = document.querySelector(
      ".FriendRequestNotification .red-dot"
    );
    if (friendRequestsNumber === 0) {
      redDot.classList.remove("active");
    } else {
      redDot.classList.add("active");
    }
  }, [friendRequestsNumber]);

  useEffect(() => {
    if (socket) {
      socket.on("getFriendRequestNotification", (sender) => {
        console.log(sender + " has sent you a friend request!");
        DB_getData(sender, 1);
        setFriendRequestsNumber((prevRequests) => {
          return prevRequests + 1;
        });
      });

      socket.on("FriendRequestCanceled", (sender) => {
        console.log(sender + " has canceled a friend request!");
        setRequests((prevRequests) => {
          return prevRequests.filter((e) => e.username !== sender);
        });
        setFriendRequestsNumber((prevRequests) => {
          return prevRequests - 1;
        }); //?
      });
    }
  }, [socket]);

  async function DB_getData(username, from) {
    const response = await axios.post(
      "http://localhost:5000/users/searchByUsername",
      {
        username: username,
      }
    );
    setRequests((prevRequests) => {
      if (!prevRequests.find((e) => e.username === response.data.username)) {
        return [response.data, ...prevRequests];
      }
      return prevRequests;
    });
    if (from === 1) {
      setPopup({
        show: true,
        text: " has sent you a friend request.",
        type: "request",
        username: response.data.username,
        profilePicture: response.data.profilePicture,
      });
    }
  }

  return (
    <div className="FriendRequestNotification">
      <input type="checkbox" name="cb_friendBox" id="cb_friendBox" />
      <label htmlFor="cb_friendBox">
        <svg
          id="svg_requestBox"
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
            <circle
              cx="12"
              cy="6"
              r="4"
              stroke="#ffffff"
              stroke-width="2.16"
            ></circle>{" "}
            <path
              d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
              stroke="#ffffff"
              stroke-width="2.16"
            ></path>{" "}
          </g>
        </svg>
      </label>
      <div className="requests-box">
        <div className="title">
          <div className="text">Friend Requests</div>
          <div className="other">
            <span className="req-span"></span>
            <div className="number">{friendRequestsNumber} friend requests</div>
          </div>
        </div>
        <div className="requests">
          {requests.map((request, index) => {
            return <FriendRequest key={index} {...request} socket={socket} />;
          })}
        </div>
        <div className="show-all">Show All</div>
      </div>
      <span className="red-dot"></span>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "../styles/PostNotifications.css";
import axios from "axios";
import Notification from "./Notification";

export default function PostNotifications(props) {
  const { socket, myData, setPopup } = props;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (myData.notifications !== undefined && myData.notifications.length > 0) {
      console.log(myData.notifications);
      for (let i = 0; i < myData.notifications.length; i++) {
        DB_getUserProfilePicture(myData.notifications[i]);
      }
    }
  }, [myData]);

  useEffect(() => {
    if (socket && typeof myData.username !== "undefined") {
      socket.on("getNewPost", ({ username }) => {
        const sender = username;
        const receiver = myData.username;
        if (sender !== receiver) {
          DB_getData(sender, 4);
          // DB_writeInDB(receiver, sender, 4);
          DB_getUserProfilePicture({
            sender: sender,
            text: " has posted something new.",
          });
        }
      });
    }
  }, [socket, myData]);

  useEffect(() => {
    if (socket) {
      socket.on(
        "getFriendRequestAcceptedNotification",
        ({ sender, receiver }) => {
          console.log(sender + " has accepted your friend request.");
          DB_getData(sender, 1);
          // DB_writeInDB(receiver, sender, 1);
          DB_getUserProfilePicture({
            sender: sender,
            text: " has accepted your friend request.",
          });
        }
      );
      socket.on("PostIsLiked", ({ sender, receiver, postId }) => {
        console.log(sender + " has liked your post " + postId);
        DB_getData(sender, 2, postId);
        // DB_writeInDB(receiver, sender, 2);
        DB_getUserProfilePicture({
          sender: sender,
          text: " has liked your post.",
        });
      });

      socket.on("commentNotification", ({ sender, receiver, postId }) => {
        console.log(
          sender + " has commented your post " + postId + " " + receiver
        );
        DB_getData(sender, 3, postId);
        // DB_writeInDB(receiver, sender, 3);
        DB_getUserProfilePicture({
          sender: sender,
          text: " has commented your post.",
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  async function DB_getData(username, from, postId) {
    const response = await axios.post(
      "http://localhost:5000/users/searchByUsername",
      {
        username: username,
      }
    );

    if (from === 1) {
      setPopup({
        show: true,
        text: " has accepted your friend requests.",
        type: "request",
        username: response.data.username,
        profilePicture: response.data.profilePicture,
      });
    } else if (from === 2) {
      setPopup({
        show: true,
        text: " has liked your post.",
        type: "post",
        postId: postId,
        username: response.data.username,
        profilePicture: response.data.profilePicture,
      });
    } else if (from === 3) {
      setPopup({
        show: true,
        text: " has commented your post.",
        type: "post",
        postId: postId,
        username: response.data.username,
        profilePicture: response.data.profilePicture,
      });
    } else if (from === 4) {
      setPopup({
        show: true,
        text: "  has just posted something.",
        type: "request",
        username: response.data.username,
        profilePicture: response.data.profilePicture,
      });
    }
  }

  const linkToNotifications = () => {
    window.location.href = `http://localhost:3000/mySphere/notifications/${myData.username}`;
  };

  async function DB_writeInDB(receiver, sender, type) {
    const data = {
      username: sender,
      myUsername: receiver,
      type: type,
    };
    console.log(data);
    await axios.post("http://localhost:5000/users/addNotification", data);
  }

  async function DB_getUserProfilePicture(notification) {
    const response = await axios.post(
      "http://localhost:5000/users/getProfilePicture",
      {
        username: notification.sender,
      }
    );
    setNotifications((prevNotifications) => {
      const newElement = { ...notification, profilePicture: response.data };
      return [newElement, ...prevNotifications];
    });
  }

  return (
    <div className="PostNotifications">
      <input type="checkbox" name="cb_post" id="cb_post" />
      <label htmlFor="cb_post">
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
              d="M12 1.25C7.71983 1.25 4.25004 4.71979 4.25004 9V9.7041C4.25004 10.401 4.04375 11.0824 3.65717 11.6622L2.50856 13.3851C1.17547 15.3848 2.19318 18.1028 4.51177 18.7351C5.26738 18.9412 6.02937 19.1155 6.79578 19.2581L6.79768 19.2632C7.56667 21.3151 9.62198 22.75 12 22.75C14.378 22.75 16.4333 21.3151 17.2023 19.2632L17.2042 19.2581C17.9706 19.1155 18.7327 18.9412 19.4883 18.7351C21.8069 18.1028 22.8246 15.3848 21.4915 13.3851L20.3429 11.6622C19.9563 11.0824 19.75 10.401 19.75 9.7041V9C19.75 4.71979 16.2802 1.25 12 1.25ZM15.3764 19.537C13.1335 19.805 10.8664 19.8049 8.62349 19.5369C9.33444 20.5585 10.571 21.25 12 21.25C13.4289 21.25 14.6655 20.5585 15.3764 19.537ZM5.75004 9C5.75004 5.54822 8.54826 2.75 12 2.75C15.4518 2.75 18.25 5.54822 18.25 9V9.7041C18.25 10.6972 18.544 11.668 19.0948 12.4943L20.2434 14.2172C21.0086 15.3649 20.4245 16.925 19.0936 17.288C14.4494 18.5546 9.5507 18.5546 4.90644 17.288C3.57561 16.925 2.99147 15.3649 3.75664 14.2172L4.90524 12.4943C5.45609 11.668 5.75004 10.6972 5.75004 9.7041V9Z"
              fill="#FFFFFF"
            ></path>{" "}
          </g>
        </svg>
      </label>
      <div className="notifications-box">
        <div className="title">
          <div className="text">Notifications</div>
        </div>
        <div className="notifications">
          {notifications.map((notification) => (
            <Notification {...notification} />
          ))}
        </div>
        <div className="show-all" onClick={() => linkToNotifications()}>
          Show All
        </div>
      </div>
      <span className="red-dot"></span>
    </div>
  );
}

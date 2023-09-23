import React, { useEffect, useState } from "react";
import "../styles/AllNotifications.css";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function AllNotifications() {
  const { username } = useParams();
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (username) {
      axios
        .post("http://localhost:5000/users/getAllNotifications", { username })
        .then((response) => {
          setNotifications(response.data);
          for (let i = 0; i < response.data.length; i++) {
            const notification = response.data[i];
            axios
              .post("http://localhost:5000/users/searchByUsername", {
                username: notification.sender,
              })
              .then((response) => {
                const newUser = {
                  ...notification,
                  name: response.data.name,
                  username: response.data.username,
                  profilePicture: response.data.profilePicture,
                };
                setUsers((prev) => [newUser, ...prev]);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [username]);
  return (
    <div className="AllNotifications">
      <div className="wrapper">
        <div className="header">
          <div className="title">Notifications</div>
          <div className="number">
            <span className="dot"></span>
            {notifications.length !== 1 && (
              <div className="text"> {notifications.length} notifications</div>
            )}
            {notifications.length === 1 && (
              <div className="text"> 1 notification</div>
            )}
          </div>
        </div>

        {users.map((user, index) => (
          <div className="notification">
            <img src={user.profilePicture} alt="" />
            <div className="text">
              <div className="name">{user.name}</div>
              <div className="username">@{user.username}</div>
              <div className="notification-text">{user.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

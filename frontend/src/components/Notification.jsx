import React from "react";
import "../styles/Notification.css";

export default function Notification(props) {
  const { sender, text, profilePicture } = props;
  return (
    <div className="Notification">
      <img src={profilePicture} alt="" />
      <div className="notification-text">
        <span>{sender}</span> {text}
      </div>
    </div>
  );
}

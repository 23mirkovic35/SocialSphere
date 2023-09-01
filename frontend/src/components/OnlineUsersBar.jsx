import React, { useEffect, useState } from "react";
import "../styles/OnlineUsersBar.css";

export default function OnlineUsersBar(props) {
  const { myData, socket } = props;
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  useEffect(() => {
    if (socket) {
      socket.emit("getOnlineFriends", { myUsername: myData.myUsername });
      socket.on("allOnlineUsers", (userArray) => {
        setOnlineUsers(userArray.usernameArray);
      });
      socket.on("newOnlineUser", (username) => {
        setOnlineUsers((prevState) => {});
      });
    }
  }, [socket]);

  useEffect(() => {
    console.log(onlineUsers);
    setOnlineFriends(
      onlineUsers.filter(
        (user) =>
          user !== myData.username &&
          myData.friends.some((friend) => friend === user)
      )
    );
  }, [onlineUsers]);

  return (
    <div className="OnlineUsersBar">
      {onlineFriends.map((friend, index) => (
        <div>{friend}</div>
      ))}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "../styles/OnlineUsersBar.css";
import axios from "axios";

export default function OnlineUsersBar(props) {
  const { myData, socket } = props;

  const [friendsData, setFriendsData] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (myData.username !== undefined) {
      if (myData.friends.length > 0) {
        const fetchFriendDataPromises = myData.friends.map((friendUsername) =>
          DB_getFriendData(friendUsername)
        );

        Promise.all(fetchFriendDataPromises).then((friendDataArray) => {
          // All friend data fetched, now update friendsData
          setFriendsData((prevState) => {
            const updatedFriendsData = friendDataArray.filter((friendData) => {
              // Filter out duplicates
              return !hasDuplicates([friendData, ...prevState], "username");
            });
            return [...updatedFriendsData, ...prevState];
          });
        });
      }
    }
  }, [myData]);

  useEffect(() => {
    if (socket) {
      socket.on("allOnlineUsers", (userArray) => {
        setOnlineUsers(userArray);
      });
      socket.on("getNewOnlineUsers", (user) => {
        setOnlineUsers((prevState) => {
          return [user, ...prevState];
        });
      });
      socket.on("userLeft", (username) => {
        console.log(username + " has disconnected.");
        setOnlineUsers((prevState) => {
          if (prevState.some((user) => user.userId === username)) {
            let array = prevState.filter((user) => user.userId !== username);
            return array;
          }
          return prevState;
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (onlineUsers) {
      console.log(onlineUsers);
      const updatedFriendsData = friendsData.map((friend) => {
        const isOnline = onlineUsers.some(
          (onlineUser) => onlineUser.userId === friend.username
        );
        console.log({ ...friend, online: isOnline });
        return { ...friend, online: isOnline };
      });
      setFriendsData(updatedFriendsData);
    }
  }, [onlineUsers]);

  async function DB_getFriendData(username) {
    const data = {
      username: username,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/users/searchByUsername",
        data
      );

      const friendData = response.data;
      friendData.online = false;

      return friendData;
    } catch (error) {
      console.error("Error fetching friend data:", error);
      return null;
    }
  }

  function hasDuplicates(arr, propToCompare) {
    const seen = new Set();
    for (const item of arr) {
      const propValue = item[propToCompare];
      if (seen.has(propValue)) {
        return true;
      }
      seen.add(propValue);
    }
    return false;
  }

  function isFriend(arr, username) {
    return arr.some((user) => user.username === username);
  }

  return (
    <div className="OnlineUsersBar">
      <div className="all-users">
        {friendsData.map((friend, index) => {
          return (
            <div className="user" key={index}>
              <div className="image">
                <img src={friend.profilePicture} id="user-photo" alt="" />
                {friend.online && <span className="green dot"></span>}
                {!friend.online && <span className="grey dot"></span>}
              </div>
              <div className="user-info">
                <div className="name">{friend.name}</div>
                <div className="username">@{friend.username}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useUserAndSocket } from "../pages/MySphere";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Friends.css";
export default function Friends() {
  const { myData, socket } = useUserAndSocket();
  const username = useParams();
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    if (username) {
      const data = getUserData(username.username);
      data
        .then((user) => {
          // SET FRIENDS
          for (let i = 0; i < user.friends.length; i++) {
            getFriendData(user.friends[i])
              .then((res) =>
                setFriends((prevState) => {
                  if (
                    prevState?.some(
                      (friend) => friend.username === res.username
                    )
                  )
                    return prevState;
                  return [...prevState, res];
                })
              )
              .catch((error) => console.log(error));
          }

          // SET REQUESTS

          for (let i = 0; i < user.friendRequests.length; i++) {
            getUserData(user.friendRequests[i])
              .then((res) =>
                setRequests((prevState) => {
                  if (
                    prevState?.some(
                      (request) => request.username === res.username
                    )
                  )
                    return prevState;
                  return [...prevState, res];
                })
              )
              .catch((error) => console.log(error));
          }

          // SET MY REQUESTS

          for (let i = 0; i < user.myRequests.length; i++) {
            getUserData(user.myRequests[i])
              .then((res) =>
                setMyRequests((prevState) => {
                  if (
                    prevState?.some(
                      (request) => request.username === res.username
                    )
                  )
                    return prevState;
                  return [...prevState, res];
                })
              )
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
    }
  }, [username]);

  useEffect(() => {
    if (typeof myData.username !== "undefined") {
      console.log(myData.username + " " + username.username);
      if (myData.username === username.username) setIsMe(true);
    }
  }, [myData]);

  async function getUserData(username) {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/findUserByUsername",
        { username: username }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function getFriendData(username) {
    try {
      const data = {
        username: username,
      };
      const response = await axios.post(
        "http://localhost:5000/users/searchByUsername",
        data
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const handleAccpet = (username) => {
    const data = {
      myUsername: myData.username,
      friendUsername: username,
    };
    axios
      .post("http://localhost:5000/users/addFriend", data)
      .then((response) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
    setRequests((prevState) =>
      prevState.filter((requests) => requests.username !== username)
    );
    getFriendData(username)
      .then((res) => setFriends((prevState) => [...prevState, res]))
      .catch((error) => console.log(error));
    socket.emit("acceptFriendRequest", {
      sender: myData.username,
      receiver: username,
    });
  };
  const handleReject = (username) => {
    const data = {
      myUsername: myData.username,
      friendUsername: username,
    };
    axios
      .post("http://localhost:5000/users/rejectFriendRequest", data)
      .then((response) => {
        setRequests((prevState) =>
          prevState.filter((requests) => requests.username !== username)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleCancle = (username) => {
    const data = {
      myUsername: myData.username,
      friendUsername: username,
    };
    axios
      .post("http://localhost:5000/users/removeFriendRequest", data)
      .then((response) => {
        setMyRequests((prevState) =>
          prevState.filter((requests) => requests.username !== username)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const viewUserProfile = (username) => {
    window.location.href = `http://localhost:3000/mySphere/profile/${username}`;
  };
  return (
    <div className="Friends">
      {isMe && (
        <div className="friend-container">
          <div className="title">
            <div className="text">My Requests</div>
            <div className="friend-number">
              <span className="dot"></span>
              <div className="value">{myRequests.length} friend requests</div>
            </div>
          </div>
          <div className="requests">
            {myRequests.map((request, index) => (
              <div className="request" key={index}>
                <div
                  className="name"
                  onClick={() => viewUserProfile(request.username)}
                >
                  {request.name}
                </div>
                <div className="image">
                  <img src={request.profilePicture} alt="" />
                </div>
                <div className="btn-container">
                  <button
                    id="cancle-fr"
                    onClick={() => {
                      handleCancle(request.username);
                    }}
                  >
                    <svg
                      height={25}
                      width={25}
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="-8.32 -8.32 80.64 80.64"
                      enable-background="new 0 0 64 64"
                      fill="#000000"
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
                          fill="none"
                          stroke="#ffffff"
                          stroke-width="4.544"
                          stroke-miterlimit="10"
                          d="M53.919,10.08c12.108,12.106,12.108,31.733,0,43.84 c-12.105,12.107-31.732,12.107-43.838,0c-12.108-12.106-12.108-31.733,0-43.84C22.187-2.027,41.813-2.027,53.919,10.08z"
                        ></path>{" "}
                        <line
                          fill="none"
                          stroke="#ffffff"
                          stroke-width="4.544"
                          stroke-miterlimit="10"
                          x1="10.08"
                          y1="10.08"
                          x2="53.92"
                          y2="53.92"
                        ></line>{" "}
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {isMe && (
        <div className="friend-container">
          <div className="title">
            <div className="text">Friend Requests</div>
            <div className="friend-number">
              <span className="dot"></span>
              <div className="value">{requests.length} friend requests</div>
            </div>
          </div>
          <div className="requests">
            {requests.map((request, index) => (
              <div className="request" key={index}>
                <div
                  className="name"
                  onClick={() => viewUserProfile(request.username)}
                >
                  {request.name}
                </div>
                <div className="image">
                  <img src={request.profilePicture} alt="" />
                </div>
                <div className="btn-container">
                  <button
                    id="accept-fr"
                    onClick={() => {
                      handleAccpet(request.username);
                    }}
                  >
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
                  <button
                    id="reject-fr"
                    onClick={() => {
                      handleReject(request.username);
                    }}
                  >
                    <svg
                      height={20}
                      width={20}
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000000"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fill="#ffffff"
                          d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                        ></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="friend-container">
        <div className="title">
          <div className="text">Friends</div>
          <div className="friend-number">
            <span className="dot"></span>
            <div className="value">{friends.length} friends</div>
          </div>
        </div>
        <div className="requests">
          {friends.map((friend, index) => (
            <div className="request" key={index}>
              <div
                className="name"
                onClick={() => viewUserProfile(friend.username)}
              >
                {friend.name}
              </div>
              <div className="image">
                <img src={friend.profilePicture} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

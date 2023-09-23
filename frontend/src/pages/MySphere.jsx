import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Outlet,
  useOutletContext,
} from "react-router-dom";
import { io } from "socket.io-client";
import FeedNavbar from "../components/FeedNavbar";
import Sidebar from "../components/SideBar";
import "../styles/MySphere.css";
import axios from "axios";
import Popup from "../components/Popup";
import OnlineUsersBar from "../components/OnlineUsersBar";
import CallNotification from "../components/CallNotification";

export default function MySphere() {
  const [socket, setSocket] = useState(null);
  const [myData, setMyData] = useState({});
  const [popup, setPopup] = useState({});
  const username = localStorage.getItem("user");
  const [callNotification, setCallNotification] = useState(false);
  const [callerData, setCallerData] = useState({});

  window.addEventListener("click", handleClick);

  function handleClick(event) {
    const messages = document.getElementById("cb_msgBox");
    const requests = document.getElementById("cb_friendBox");
    const settings = document.getElementById("cb_profile");
    if (
      event.target.id === "cb_friendBox" ||
      event.target.id === "svg_requestBox"
    ) {
      messages.checked = false;
      settings.checked = false;
    } else if (
      event.target.id === "cb_msgBox" ||
      event.target.id === "svg_messageBox"
    ) {
      requests.checked = false;
      settings.checked = false;
    } else if (event.target.id === "cb_profile") {
      messages.checked = false;
      requests.checked = false;
    } else {
      messages.checked = false;
      requests.checked = false;
      settings.checked = false;
    }
  }
  async function getDataFromDB(username) {
    const response = await axios.post(
      "http://localhost:5000/users/findUserByUsername",
      {
        username: username,
      }
    );
    await setMyData(response.data);
    return response;
  }
  useEffect(() => {
    getDataFromDB(username);
  }, []);

  useEffect(() => {
    const socketInstance = io("http://localhost:4200");
    setSocket(socketInstance);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("addOnlineUser", username);
      const myUsername = localStorage.getItem("user");
      socket.emit("getOnlineFriends", { myUsername: myUsername });
      socket.on(
        "showCallNotification",
        ({ sender, reveicer, senderSocketID, receiverSocketID }) => {
          axios
            .post("http://localhost:5000/users/searchByUsername", {
              username: sender,
            })
            .then((response) => {
              const id = socket.id;

              const callerObj = { ...response.data, id: id };
              console.log(callerObj);
              setCallerData(callerObj);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          setCallNotification(true);
        }
      );
    }
  }, [socket]);
  return (
    <div className="MySphere">
      {callNotification && <CallNotification callerData={callerData} />}
      <Popup {...popup} close={setPopup} />
      <FeedNavbar myData={myData} socket={socket} setPopup={setPopup} />
      <Sidebar myData={myData} />
      <div className="mySphere-routes">
        <Outlet context={{ myData, socket }} />
      </div>
      <OnlineUsersBar myData={myData} socket={socket} />
    </div>
  );
}

export function useUserAndSocket() {
  return useOutletContext();
}

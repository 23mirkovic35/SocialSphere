import React, { useState } from "react";
import "../styles/NewGroup.css";
import axios from "axios";
export default function NewGroup({ setNewGroup, myUsername, setMyGroups }) {
  const [groupName, setGroupName] = useState("");
  const handleClose = () => {
    setNewGroup(false);
  };
  const createGroup = () => {
    const data = {
      myUsername: myUsername,
      name: groupName,
    };
    axios.post("http://localhost:5000/groups/createGroup", data).then((res) => {
      setMyGroups((prevState) => [...prevState, res.data]);
      setGroupName("");
      setNewGroup(false);
    });
  };

  const handleTextChange = (e) => {
    setGroupName(e.target.value);
  };
  return (
    <div className="NewGroup">
      <div className="wrapper">
        <svg
          id="close"
          onClick={handleClose}
          height={30}
          width={30}
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
              d="M16 8L8 16M8 8L16 16"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
            ></path>{" "}
          </g>
        </svg>
        <div className="title">Create New Group</div>
        <input
          type="text"
          name="group_name"
          id="group_name"
          placeholder="Group name"
          onChange={handleTextChange}
        />
        <div className="btn-container">
          <button
            onClick={() => {
              createGroup();
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

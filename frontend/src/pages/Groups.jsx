import React, { useEffect, useState } from "react";
import { useUserAndSocket } from "./MySphere";
import "../styles/Groups.css";
import NewGroup from "../components/NewGroup";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Groups() {
  const { myData, socket } = useUserAndSocket();
  const { username } = useParams();
  const [newGroup, setNewGroup] = useState(false);
  const [myGroups, setMyGroups] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (typeof username !== "undefined") {
      const data = {
        username: username,
      };
      axios
        .post("http://localhost:5000/groups/getUserGroups", data)
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            const group = res.data[i];
            group.isAdmin = group.admins.some((user) => user === username);
          }
          setMyGroups(res.data);
        });
      axios
        .post("http://localhost:5000/groups/getAllGroups", data)
        .then((res) => {
          setGroups(res.data);
        });
    }
  }, [username]);

  const joinGroup = (groupId) => {
    const data = {
      username: username,
      groupId: groupId,
    };
    axios.post("http://localhost:5000/groups/joinGroup", data).then((res) => {
      let group = groups.find((group) => group._id === groupId);
      setGroups((prevState) =>
        prevState.filter((group) => group._id !== groupId)
      );
      setMyGroups((prevState) => [...prevState, group]);
    });
  };

  const visitGroupPage = (groupId) => {
    window.location.href = `http://localhost:3000/mySphere/group/${groupId}`;
  };

  return (
    <div className="Groups">
      {newGroup && (
        <NewGroup
          setNewGroup={setNewGroup}
          myUsername={username}
          setMyGroups={setMyGroups}
        />
      )}
      <div className="groups-header">
        <div className="title">My Groups</div>
        <div className="number">
          <span className="dot"></span>
          <div className="text">{myGroups.length} groups</div>
        </div>
      </div>
      <div className="groups-box">
        {myGroups.map((group, index) => (
          <div
            className="field"
            key={index}
            onClick={() => {
              visitGroupPage(group._id);
            }}
          >
            {group.isAdmin && (
              <div className="admin-icon">
                <svg
                  height={12}
                  width={12}
                  fill="#000000"
                  viewBox="0 0 1920 1920"
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
                      d="m773.596 1069.654 711.086 711.085c39.632 39.632 104.336 39.632 144.078 0l138.276-138.385c19.268-19.269 29.888-44.778 29.888-71.93 0-27.26-10.62-52.77-29.888-72.039l-698.714-698.714 11.495-32.625c63.5-178.675 18.284-380.45-115.284-514.018-123.715-123.605-305.126-171.01-471.648-128.313l272.281 272.282c32.516 32.406 50.362 75.652 50.362 121.744 0 45.982-17.846 89.227-50.362 121.744L654.48 751.17c-67.222 67.003-176.375 67.003-243.488 0L138.711 478.889c-42.589 166.522 4.707 347.934 128.313 471.648 123.714 123.715 306.22 172.325 476.027 127.218l30.545-8.101ZM1556.611 1920c-54.084 0-108.168-20.692-149.333-61.857L740.095 1190.96c-198.162 41.712-406.725-19.269-550.475-163.019C14.449 852.771-35.256 582.788 65.796 356.27l32.406-72.696 390.194 390.193c24.414 24.305 64.266 24.305 88.68 0l110.687-110.686c11.824-11.934 18.283-27.59 18.283-44.34 0-16.751-6.46-32.516-18.283-44.34L297.569 84.207 370.265 51.8C596.893-49.252 866.875.453 1041.937 175.515c155.026 155.136 212.833 385.157 151.851 594.815l650.651 650.651c39.961 39.852 61.967 92.95 61.967 149.443 0 56.383-22.006 109.482-61.967 149.334l-138.275 138.385c-41.275 41.165-95.36 61.857-149.553 61.857Z"
                      fill-rule="evenodd"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
            )}
            {group.name}
          </div>
        ))}
        <div className="field">
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
                d="M6.85929 1.25001C6.88904 1.25001 6.91919 1.25002 6.94976 1.25002L6.98675 1.25001C7.33818 1.24999 7.56433 1.24998 7.78542 1.27065C8.7367 1.35961 9.63905 1.73337 10.3746 2.34313C10.5456 2.48485 10.7055 2.64477 10.954 2.89329L11.5303 3.46969C12.3761 4.3154 12.7012 4.6311 13.0768 4.84005C13.2948 4.96134 13.526 5.05713 13.766 5.12552C14.1793 5.24333 14.6324 5.25002 15.8284 5.25002L16.253 5.25002C17.526 5.25 18.5521 5.24998 19.364 5.35206C20.2054 5.45784 20.9204 5.68358 21.5077 6.21185C21.6061 6.30032 21.6997 6.39394 21.7882 6.49231C22.3165 7.07965 22.5422 7.79459 22.648 8.63601C22.75 9.4479 22.75 10.4741 22.75 11.747V14.0564C22.75 15.8942 22.75 17.3498 22.5969 18.489C22.4393 19.6615 22.1071 20.6104 21.3588 21.3588C20.6104 22.1071 19.6615 22.4393 18.489 22.5969C17.3498 22.75 15.8942 22.75 14.0564 22.75H9.94361C8.10584 22.75 6.65021 22.75 5.51099 22.5969C4.33857 22.4393 3.38962 22.1071 2.64126 21.3588C1.8929 20.6104 1.56078 19.6615 1.40315 18.489C1.24999 17.3498 1.25 15.8942 1.25002 14.0564L1.25002 6.94976C1.25002 6.91919 1.25001 6.88904 1.25001 6.85929C1.2499 6.06338 1.24982 5.55685 1.33237 5.11935C1.6949 3.19788 3.19788 1.6949 5.11935 1.33237C5.55685 1.24982 6.06338 1.2499 6.85929 1.25001ZM6.94976 2.75002C6.03312 2.75002 5.67873 2.75329 5.39746 2.80636C4.08277 3.05441 3.05441 4.08277 2.80636 5.39746C2.75329 5.67873 2.75002 6.03312 2.75002 6.94976V14C2.75002 15.9068 2.75161 17.2615 2.88978 18.2892C3.02504 19.2953 3.27871 19.8749 3.70192 20.2981C4.12513 20.7213 4.70478 20.975 5.71087 21.1103C6.73853 21.2484 8.0932 21.25 10 21.25H14C15.9068 21.25 17.2615 21.2484 18.2892 21.1103C19.2953 20.975 19.8749 20.7213 20.2981 20.2981C20.7213 19.8749 20.975 19.2953 21.1103 18.2892C21.2484 17.2615 21.25 15.9068 21.25 14V11.7979C21.25 10.4621 21.2486 9.5305 21.1597 8.82312C21.0731 8.13448 20.9141 7.76356 20.6729 7.49539C20.6198 7.43637 20.5637 7.3802 20.5046 7.32712C20.2365 7.08592 19.8656 6.92692 19.1769 6.84034C18.4695 6.75141 17.538 6.75002 16.2021 6.75002H15.8284C15.7912 6.75002 15.7545 6.75002 15.7182 6.75003C14.6702 6.75025 13.9944 6.75038 13.3548 6.56806C13.0041 6.46811 12.6661 6.32811 12.3475 6.15083C11.7663 5.82747 11.2885 5.3495 10.5476 4.60833C10.522 4.58265 10.496 4.55666 10.4697 4.53035L9.91943 3.98009C9.63616 3.69682 9.52778 3.58951 9.41731 3.49793C8.91403 3.08073 8.29664 2.825 7.64576 2.76413C7.50289 2.75077 7.35038 2.75002 6.94976 2.75002ZM12 11.25C12.4142 11.25 12.75 11.5858 12.75 12V13.25H14C14.4142 13.25 14.75 13.5858 14.75 14C14.75 14.4142 14.4142 14.75 14 14.75H12.75V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V14.75H10C9.5858 14.75 9.25002 14.4142 9.25002 14C9.25002 13.5858 9.5858 13.25 10 13.25H11.25V12C11.25 11.5858 11.5858 11.25 12 11.25Z"
                fill="#000000"
              ></path>{" "}
            </g>
          </svg>
          <div
            className="text"
            onClick={() => {
              setNewGroup(true);
            }}
          >
            New Group
          </div>
        </div>
      </div>
      <div className="groups-header">
        <div className="title">All Groups</div>
        <div className="number">
          <span className="dot"></span>
          <div className="text">{groups.length} groups</div>
        </div>
      </div>
      <div className="groups-box">
        {groups &&
          groups.map((group, index) => (
            <div
              className="field"
              key={index}
              onClick={() => {
                joinGroup(group._id);
              }}
            >
              {group.name}
            </div>
          ))}
      </div>
    </div>
  );
}

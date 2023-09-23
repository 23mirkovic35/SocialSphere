import React, { useEffect, useState } from "react";
import "../styles/SearchBar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    const resultBox = document.querySelector(".SearchBox .search-result");
    const intputValue = e.target.value.trim();
    if (intputValue === "") {
      setUsers([]);
      if (resultBox.classList.contains("active"))
        resultBox.classList.remove("active");
      return;
    }
    if (!resultBox.classList.contains("active"))
      resultBox.classList.add("active");
    if (intputValue[0] === "@") {
      if (intputValue === "@") return;
      const username = e.target.value.slice(1);
      axios
        .post("http://localhost:5000/users/lookByUsername", {
          parameter: username,
        })
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      axios
        .post("http://localhost:5000/users/searchByName", {
          parameter: e.target.value,
        })
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  function visitUserPage(username) {
    const resultBox = document.querySelector(".SearchBox .search-result");
    resultBox.classList.remove("active");
    navigate(`/mySphere/profile/${username}`);
  }

  return (
    <div className="SearchBox">
      <input type="checkbox" name="cb_search" id="cb_search" />
      <label htmlFor="cb_search">
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
              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </label>
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search SocialSphere..."
          onChange={handleChange}
        />
        <div className="search-result">
          {users.map((user, index) => (
            <div
              key={index}
              className="result"
              onClick={() => {
                visitUserPage(user.username);
              }}
            >
              <img src={user.profilePicture} alt="" />
              <div className="user-name">{user.name}</div>
              <span className="user-username">@{user.username}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

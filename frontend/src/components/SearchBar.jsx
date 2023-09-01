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
  };

  function visitUserPage(username) {
    const resultBox = document.querySelector(".SearchBox .search-result");
    resultBox.classList.remove("active");
    navigate(`/mySphere/profile/${username}`);
  }

  return (
    <div className="SearchBox">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search SocialSphere"
        onChange={handleChange}
      />
      <svg
        id="loop"
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
            d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
            stroke="#a1a1a1"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{" "}
        </g>
      </svg>
      <div className="search-parameters">
        <input type="checkbox" name="search-by" id="search-by" />
        <label htmlFor="search-by">
          <svg
            id="search-settings"
            height={20}
            width={20}
            viewBox="-0.5 0 25 25"
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
                d="M12 7.82001H22"
                stroke="#a1a1a1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M2 7.82001H4"
                stroke="#a1a1a1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M20 16.82H22"
                stroke="#a1a1a1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M2 16.82H12"
                stroke="#a1a1a1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M8 11.82C10.2091 11.82 12 10.0291 12 7.82001C12 5.61087 10.2091 3.82001 8 3.82001C5.79086 3.82001 4 5.61087 4 7.82001C4 10.0291 5.79086 11.82 8 11.82Z"
                stroke="#a1a1a1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
              <path
                d="M16 20.82C18.2091 20.82 20 19.0291 20 16.82C20 14.6109 18.2091 12.82 16 12.82C13.7909 12.82 12 14.6109 12 16.82C12 19.0291 13.7909 20.82 16 20.82Z"
                stroke="#a1a1a1"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </label>
        <div className="search-options">
          <div className="title">Search by</div>
          <div className="options">
            <div className="radio-container">
              <input type="radio" name="search-options" id="rb_name" checked />
              <label htmlFor="rb_name">Name</label>
            </div>
            <div className="radio-container">
              <input type="radio" name="search-options" id="rb_username" />
              <label htmlFor="rb_username">Username</label>
            </div>
            <div className="radio-container">
              <input type="radio" name="search-options" id="rb_hashtag" />
              <label htmlFor="rb_hashtag">Hashtag</label>
            </div>
          </div>
        </div>
      </div>
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
  );
}

import React, { useEffect, useState } from "react";
import "../styles/EmojiSelector.css";
import axios from "axios";

export default function EmojiSelector({ setText }) {
  const [emojiArray, setEmojiArray] = useState([]);
  useEffect(() => {
    const emojiSearch = document.getElementById("emoji_search");
    emojiSearch.addEventListener("keyup", (e) => {
      let value = e.target.value;
      let emojis = document.querySelectorAll("#emojiList li");
      emojis.forEach((emoji) => {
        if (emoji.getAttribute("emoji-name").toLowerCase().includes(value)) {
          emoji.style.display = "flex";
        } else {
          emoji.style.display = "none";
        }
      });
    });
    axios
      .get("http://localhost:5000/emojis/getEmojis")
      .then((emojis) => {
        loadEmojis(emojis.data);
      })
      .catch((error) => console.log(error));
  }, []);
  function loadEmojis(data) {
    data.forEach((emoji) => {
      setEmojiArray((prevState) => {
        return [...prevState, emoji];
      });
    });
  }
  const handleEmojiClick = (character) => {
    setText((prevState) => {
      console.log(prevState);
      return prevState + character;
    });
  };
  return (
    <div className="EmojiSelector">
      <input type="checkbox" name="cb_emoji" id="cb_emoji" />
      <label htmlFor="cb_emoji">
        <svg
          height="25px"
          width="25px"
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
              d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z"
              fill="#a1a1a1"
            ></path>{" "}
            <path
              d="M17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8C16.3284 8 17 8.67157 17 9.5Z"
              fill="#a1a1a1"
            ></path>{" "}
            <path
              d="M8.88875 13.5414C8.63822 13.0559 8.0431 12.8607 7.55301 13.1058C7.05903 13.3528 6.8588 13.9535 7.10579 14.4474C7.18825 14.6118 7.29326 14.7659 7.40334 14.9127C7.58615 15.1565 7.8621 15.4704 8.25052 15.7811C9.04005 16.4127 10.2573 17.0002 12.0002 17.0002C13.7431 17.0002 14.9604 16.4127 15.7499 15.7811C16.1383 15.4704 16.4143 15.1565 16.5971 14.9127C16.7076 14.7654 16.8081 14.6113 16.8941 14.4485C17.1387 13.961 16.9352 13.3497 16.4474 13.1058C15.9573 12.8607 15.3622 13.0559 15.1117 13.5414C15.0979 13.5663 14.9097 13.892 14.5005 14.2194C14.0401 14.5877 13.2573 15.0002 12.0002 15.0002C10.7431 15.0002 9.96038 14.5877 9.49991 14.2194C9.09071 13.892 8.90255 13.5663 8.88875 13.5414Z"
              fill="#a1a1a1"
            ></path>{" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z"
              fill="#a1a1a1"
            ></path>{" "}
          </g>
        </svg>
      </label>
      <div className="emoji-box">
        <div className="emoji-search">
          <input
            type="text"
            name="emoji_search"
            id="emoji_search"
            placeholder="Search..."
          />
        </div>
        <ul className="emoji-list" id="emojiList">
          {emojiArray.map((element, index) => (
            <li
              key={index}
              emoji-name={element.slug}
              onClick={() => handleEmojiClick(element.character)}
            >
              {element.character}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

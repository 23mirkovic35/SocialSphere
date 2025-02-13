import React, { useEffect, useState } from "react";
import "../styles/NewComment.css";
import EmojiSelector from "./EmojiSelector";
import axios from "axios";
export default function NewComment({
  setComments,
  socket,
  myUsername,
  postId,
  comments,
  postUsername,
  isGroup,
  groupId,
}) {
  const [text, setText] = useState("");
  const [textareaStyle, setTextareaStyle] = useState({
    height: "20px",
  });

  const handleTextChange = (event) => {
    const { scrollHeight, clientHeight } = event.target;

    setText(event.target.value);
    if (event.target.value === "")
      setTextareaStyle({
        height: `20px`,
      });
    else
      setTextareaStyle({
        height: `${scrollHeight > clientHeight ? scrollHeight : "auto"}px`,
      });
  };

  const handleNewComment = (e) => {
    e.preventDefault();
    const newComment = {
      username: myUsername,
      text: text,
      time: new Date(),
    };
    const data = {
      comments: [...comments, newComment],
      _id: postId,
    };

    if (isGroup) {
      axios
        .post("http://localhost:5000/groups/updatePostComments", {
          ...data,
          groupId,
        })
        .then((response) => {
          setComments((prevState) => [...prevState, newComment]);
          if (myUsername !== postUsername) {
            socket.emit("newPostComment", {
              sender: myUsername,
              receiver: postUsername,
              postId: postId,
            });
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post("http://localhost:5000/posts/updateComments", data)
        .then((response) => {
          setComments((prevState) => [...prevState, newComment]);
          if (myUsername !== postUsername) {
            socket.emit("newPostComment", {
              sender: myUsername,
              receiver: postUsername,
              postId: postId,
            });
            DB_addNotification(myUsername, 3);
          }
        })
        .catch((error) => console.log(error));
    }
    setText("");
  };

  async function DB_addNotification(username, type) {
    const data = {
      username: username,
      type: type,
    };
    console.log(data);
    await axios.post("http://localhost:5000/users/addNotification", data);
  }

  return (
    <div className="NewComment">
      <textarea
        className="responsive-textarea"
        style={textareaStyle}
        placeholder="Write a comment..."
        value={text}
        onChange={handleTextChange}
      />
      <button onClick={handleNewComment}>
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
              d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </button>
    </div>
  );
}

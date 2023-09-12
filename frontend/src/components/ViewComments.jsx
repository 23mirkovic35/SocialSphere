import React, { useEffect, useState } from "react";
import "../styles/ViewComments.css";
import NewComment from "./NewComment";
import axios from "axios";
export default function ViewComments({
  comments,
  name,
  setComments,
  socket,
  myUsername,
  postId,
  setShowCommentSection,
  postUsername,
}) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (comments.length > 0) {
      for (let i = 0; i < comments.length; i++) {
        const username = comments[i].username;
        getUserData(username).then((res) => {
          const newElement = { ...comments[i], ...res };
          setUsers((prevState) =>
            prevState
              .filter(
                (element) =>
                  element.username !== newElement.username ||
                  element.text !== newElement.text ||
                  element.time !== newElement.time
              )
              .concat(newElement)
              .sort((a, b) => {
                const timeA = new Date(a.time);
                const timeB = new Date(b.time);
                return timeA - timeB;
              })
          );
        });
      }
    }
  }, [comments]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const handleClose = () => {
    setShowCommentSection(false);
  };

  async function getUserData(username) {
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

  function formatTimeDifference(timeStr) {
    const currentTime = new Date();
    const time = new Date(timeStr);
    const timeDiffInSeconds = Math.floor((currentTime - time) / 1000);
    let retVal = "";
    if (timeDiffInSeconds < 60) {
      if (timeDiffInSeconds === 1) {
        retVal = "one second ago";
      } else if (timeDiffInSeconds === 0) {
        retVal = "just now";
      } else {
        retVal = `${timeDiffInSeconds} seconds ago`;
      }
    } else if (timeDiffInSeconds < 3600) {
      const minutes = Math.floor(timeDiffInSeconds / 60);
      if (minutes === 1) {
        retVal = "one minute ago";
      } else {
        retVal = `${minutes} minutes ago`;
      }
    } else if (timeDiffInSeconds < 86400) {
      const hours = Math.floor(timeDiffInSeconds / 3600);
      if (hours === 1) {
        retVal = "one hour ago";
      } else {
        retVal = `${hours} hours ago`;
      }
    } else if (timeDiffInSeconds < 604800) {
      const days = Math.floor(timeDiffInSeconds / 86400);
      if (days === 1) {
        retVal = "one day ago";
      } else {
        retVal = `${days} days ago`;
      }
    } else if (timeDiffInSeconds < 2419200) {
      const weeks = Math.floor(timeDiffInSeconds / 604800);
      if (weeks === 1) {
        retVal = "one week ago";
      } else {
        retVal = `${weeks} weeks ago`;
      }
    } else {
      const formattedDate = time.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      retVal = `${formattedDate}`;
    }
    return retVal;
  }

  return (
    <div className="ViewComments">
      <div className="container">
        <div className="comments-header">
          <svg
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
          <div className="title">Comments on {name}'s post</div>
          <div className="total-number">
            <span className="dot"></span>
            {comments.length <= 1 && (
              <div className="text">{comments.length} comment</div>
            )}
            {comments.length > 1 && (
              <div className="text">{comments.length} comments</div>
            )}
            <span className="dot"></span>
          </div>
        </div>
        <div className="comment-box">
          {users.map((comment, index) => (
            <div className="comment" key={index}>
              <div className="image">
                <img src={comment.profilePicture} alt="" />
              </div>
              <div className="comment-content">
                <div className="user-info">
                  <div className="user-name">{comment.name}</div>
                  <div className="time">
                    {formatTimeDifference(comment.time)}
                  </div>
                </div>
                <div className="comment-text">{comment.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="new-comment">
          <NewComment
            setComments={setComments}
            socket={socket}
            myUsername={myUsername}
            postId={postId}
            comments={comments}
            postUsername={postUsername}
          />
        </div>
      </div>
    </div>
  );
}

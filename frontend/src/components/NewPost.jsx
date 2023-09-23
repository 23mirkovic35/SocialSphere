import React, { useEffect, useState } from "react";
import "../styles/Post.css";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Import additional modules if needed
import "swiper/css/pagination"; // Import additional modules if needed
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import ViewComments from "./ViewComments";
import NewComment from "./NewComment";

export default function NewPost(props) {
  const { post, myUsername, socket, isGroup, groupId } = props;
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);

  useEffect(() => {
    const username = post.username;

    axios
      .post("http://localhost:5000/users/searchByUsername", {
        username: username,
      })
      .then((response) => {
        setName(response.data.name);
        setProfilePicture(response.data.profilePicture);
        console.log(response.data);
        setIsLiked(post.likes.some((like) => like === myUsername));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (post) {
      setLikes(post.likes);
      setComments(post.comments);
    }
  }, [post]);

  function formatTimeDifference(timeStr) {
    const currentTime = new Date();
    const time = new Date(timeStr);
    const timeDiffInSeconds = Math.floor((currentTime - time) / 1000);
    let retVal = "";
    if (timeDiffInSeconds < 60) {
      if (timeDiffInSeconds === 1) {
        retVal = "one second ago";
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

  async function handleLike() {
    const newIsLiked = !isLiked;
    if (newIsLiked && post.username !== myUsername) {
      socket.emit("postLiked", {
        sender: myUsername,
        receiver: post.username,
        postId: post._id,
      });
    }
    setIsLiked(newIsLiked);
    let newLikes = [...likes];
    if (newLikes.some((username) => username === myUsername)) {
      newLikes = newLikes.filter((username) => username !== myUsername);
    } else {
      const username = localStorage.getItem("user");
      newLikes.push(username);
    }
    setLikes(newLikes);

    const data = {
      likes: newLikes,
      _id: post._id,
    };
    console.log(newLikes);
    try {
      const response = isGroup
        ? await axios.post("http://localhost:5000/groups/updatePostLikes", {
            ...data,
            groupId,
          })
        : await axios.post("http://localhost:5000/posts/updateLikes", data);
      if (!isGroup) {
        DB_addNotification(myUsername, 2);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function DB_addNotification(username, type) {
    const data = {
      username: username,
      type: type,
    };
    console.log(data);
    await axios.post("http://localhost:5000/users/addNotification", data);
  }

  const viewPost = () => {
    setShowCommentSection(true);
  };

  return (
    <div className="Post">
      {showCommentSection && (
        <ViewComments
          setShowCommentSection={setShowCommentSection}
          comments={comments}
          name={name}
          setComments={setComments}
          socket={socket}
          myUsername={myUsername}
          postId={post._id}
          postUsername={post.username}
          isGroup={isGroup}
          groupId={groupId}
        />
      )}
      <div className="post-header">
        <img id="user-profilePicture" src={profilePicture} alt="" />
        <div className="post-info">
          <div className="name">{name}</div>
          <div className="time">{formatTimeDifference(post.time)}</div>
        </div>
      </div>
      <div className="text">{post.text}</div>
      {post.images.length > 0 && (
        <div className="images">
          {post.images.length === 1 && (
            <img src={post.images[0]} alt="" className="post-image" />
          )}
          {post.images.length > 1 && (
            <Swiper
              freeMode={true}
              grabCursor={true}
              spaceBetween={1}
              slidesPerView={1}
              navigation={false}
            >
              {post.images.map((image, index) => (
                <SwiperSlide key={index} className="swiper-slide">
                  <div className="wrapper">
                    <div className="image-nubmer">
                      {index + 1}/{post.images.length}
                    </div>
                    <img src={image} alt="" className="post-image" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      )}
      <div className="post-footer">
        <div className="post-numbers">
          <div className={"likes" + (isLiked ? " liked" : "")}>
            <svg
              onClick={() => {
                handleLike();
              }}
              id="svg-heart"
              height={20}
              width={20}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
              stroke-width="2.4"
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
                  d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                  fill="#ffffff"
                ></path>{" "}
              </g>
            </svg>
            <div className="number">{likes.length}</div>
          </div>
          <div className="comments">
            <svg
              onClick={viewPost}
              id="svg-comment"
              height={18}
              width={18}
              viewBox="-1.6 -1.6 35.20 35.20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              stroke="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>comment 1</title> <desc>Created with Sketch Beta.</desc>{" "}
                <defs> </defs>{" "}
                <g
                  id="Page-1"
                  stroke-width="3.2"
                  fill="none"
                  fill-rule="evenodd"
                >
                  {" "}
                  <g
                    id="Icon-Set-Filled"
                    transform="translate(-102.000000, -257.000000)"
                    fill="#ffffff"
                  >
                    {" "}
                    <path
                      d="M118,257 C109.164,257 102,263.269 102,271 C102,275.419 104.345,279.354 108,281.919 L108,289 L115.009,284.747 C115.979,284.907 116.977,285 118,285 C126.836,285 134,278.732 134,271 C134,263.269 126.836,257 118,257"
                      id="comment-1"
                    >
                      {" "}
                    </path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
            <div className="number">{comments.length}</div>
          </div>
        </div>
        <NewComment
          setComments={setComments}
          socket={socket}
          myUsername={myUsername}
          postId={post._id}
          comments={comments}
          postUsername={post.username}
          isGroup={isGroup}
          groupId={groupId}
        />
      </div>
    </div>
  );
}

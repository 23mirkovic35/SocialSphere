import React, { useState } from "react";
import "../styles/Post.css";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Import additional modules if needed
import "swiper/css/pagination"; // Import additional modules if needed
import { Swiper, SwiperSlide } from "swiper/react";
import NewComment from "./NewComment";

export default function NewPost(props) {
  const { post, myData, socket, isGroup, groupId } = props;
  const [comments, setComments] = useState([]);

  function formatTimeDifference(timeStr) {
    const currentTime = new Date();
    const time = new Date(timeStr);
    const timeDiffInSeconds = Math.floor((currentTime - time) / 1000);

    if (timeDiffInSeconds < 60) {
      if (timeDiffInSeconds === 0) {
        return "just now";
      } else if (timeDiffInSeconds === 1) {
        return "one second ago";
      } else {
        return `${timeDiffInSeconds} seconds ago`;
      }
    } else if (timeDiffInSeconds < 3600) {
      const minutes = Math.floor(timeDiffInSeconds / 60);
      if (minutes === 1) {
        return "one minute ago";
      } else {
        return `${minutes} minutes ago`;
      }
    } else if (timeDiffInSeconds < 86400) {
      const hours = Math.floor(timeDiffInSeconds / 3600);
      if (hours === 1) {
        return "one hour ago";
      } else {
        return `${hours} hours ago`;
      }
    } else if (timeDiffInSeconds < 604800) {
      const days = Math.floor(timeDiffInSeconds / 86400);
      if (days === 1) {
        return "one day ago";
      } else {
        return `${days} days ago`;
      }
    } else if (timeDiffInSeconds < 2419200) {
      const weeks = Math.floor(timeDiffInSeconds / 604800);
      if (weeks === 1) {
        return "one week ago";
      } else {
        return `${weeks} weeks ago`;
      }
    } else {
      const formattedDate = time.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return `${formattedDate}`;
    }
  }

  return (
    <div className="Post">
      <div className="post-header">
        <img id="user-profilePicture" src={myData.profilePicture} alt="" />
        <div className="info">
          <div className="name">{myData.name}</div>
          {/* <div className="time">August 30 at 4:23PM</div> */}
          <div className="time">{formatTimeDifference(post.date)}</div>
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
          <div className="likes">
            <svg
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
            <div className="number">{post.likes.length}</div>
          </div>
          <div className="comments">
            <svg
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
            <div className="number">{post.comments.length}</div>
          </div>
        </div>
        <NewComment
          setComments={setComments}
          socket={socket}
          myUsername={myData.username}
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

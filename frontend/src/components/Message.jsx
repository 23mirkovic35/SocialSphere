import React, { useEffect, useState } from "react";
import "../styles/Message.css";
import axios from "axios";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Import additional modules if needed
import "swiper/css/pagination"; // Import additional modules if needed
import { Swiper, SwiperSlide } from "swiper/react";

export default function Message({ message, myUsername }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (message) {
      const data = {
        username: message.senderID,
      };
      axios
        .post("http://localhost:5000/users/searchByUsername", data)
        .then((result) => setUserData(result.data))
        .catch((error) => console.log(error));
    }
  }, [message]);

  function formatTimeDifference(timeStr) {
    const currentTime = new Date();
    const time = new Date(timeStr);
    const timeDiffInMilliseconds = currentTime - time;

    if (isSameDay(currentTime, time)) {
      return formatTime(time);
    } else if (isYesterday(currentTime, time)) {
      return `Yesterday at ${formatTime(time)}`;
    } else {
      return formatDate(time) + " at " + formatTime(time);
    }
  }

  function isSameDay(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  function isYesterday(date1, date2) {
    const yesterday = new Date(date1);
    yesterday.setDate(yesterday.getDate() - 1);
    return isSameDay(yesterday, date2);
  }

  function formatTime(date) {
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  }

  function formatDate(date) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  return (
    <div
      className={
        "Message" + (message.senderID === myUsername ? " myMessage" : "")
      }
    >
      <img src={userData.profilePicture} alt="" />
      <div className="message-info">
        <div className="message-header">
          <div className="name">{userData.name}</div>
          <div className="time">{formatTimeDifference(message.time)}</div>
        </div>
        <div className="content">
          {message.text && <div className="text">{message.text}</div>}
          {message.images && (
            <div className="images">
              {message.images.length === 1 && (
                <img className="message-image" src={message.images[0]} />
              )}
              {message.images.length > 1 && (
                <Swiper
                  freeMode={true}
                  grabCursor={true}
                  spaceBetween={1}
                  slidesPerView={1}
                  navigation={false}
                >
                  {message.images.map((image, index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                      <div className="wrapper">
                        <div className="image-nubmer">
                          {index + 1}/{message.images.length}
                        </div>
                        <img src={image} alt="" className="message-image" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          )}
          {message.videos && (
            <div className="images">
              {message.videos.length === 1 && (
                <video
                  className="message-image"
                  src={message.videos[0]}
                  controls
                />
              )}
              {message.videos.length > 1 && (
                <Swiper
                  freeMode={true}
                  grabCursor={true}
                  spaceBetween={1}
                  slidesPerView={1}
                  navigation={false}
                >
                  {message.videos.map((video, index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                      <div className="wrapper">
                        <div className="image-nubmer">
                          {index + 1}/{message.videos.length}
                        </div>
                        <video
                          src={video}
                          alt=""
                          className="message-image"
                          controls
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          )}
          {message.documents && (
            <div className="documents">
              {message.documents.map((document, index) => (
                <div className="document">
                  <svg
                    height={16}
                    width={16}
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
                        d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V4C19 3.44772 18.5523 3 18 3ZM6.41421 7H9V4.41421L6.41421 7ZM7 13C7 12.4477 7.44772 12 8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13ZM7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z"
                        fill="#ffffff"
                      ></path>{" "}
                    </g>
                  </svg>
                  <div className="name">{document.name}</div>
                  <div className="downaload">
                    <a href={document.url} download>
                      <svg
                        height={16}
                        width={16}
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
                            d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
                            stroke="#ffffff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></path>{" "}
                          <path
                            d="M12 2L12 15M12 15L9 11.5M12 15L15 11.5"
                            stroke="#ffffff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

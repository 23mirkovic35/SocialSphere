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
        </div>
      </div>
    </div>
  );
}

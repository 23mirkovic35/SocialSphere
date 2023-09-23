import React, { useState } from "react";
import "../styles/RatePage.css";
import FormInput from "../components/FormInput";
import { FaStar } from "react-icons/fa6";
import axios from "axios";
import { useUserAndSocket } from "./MySphere";
export default function RatePage() {
  const { myData, socket } = useUserAndSocket();
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [starsSelected, setStarSelected] = useState(0);
  const inputComment = {
    id: 0,
    type: "textarea",
    name: "comment",
    label: "Comment",
  };
  const inputTitle = {
    id: 0,
    type: "text",
    name: "title",
    label: "Title",
  };
  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const selectStar = (number) => {
    setStarSelected(number);
  };

  const leaveReview = () => {
    console.log(myData);
    const data = {
      rating: starsSelected,
      title: title,
      comment: comment,
      name: myData.name,
      profilePicture: myData.profilePicture,
      username: myData.username,
    };
    axios
      .post("http://localhost:5000/users/leaveReview", data)
      .then(() => {
        setComment("");
        setTitle("");
        setStarSelected(0);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="RatePage">
      <div className="wrapper">
        <div className="header-title">Leave a review</div>
        {starsSelected === 0 && (
          <div className="stars">
            <FaStar
              onClick={() => selectStar(1)}
              size={25}
              color="rgba(171, 171, 171, 0.324)"
            />{" "}
            <FaStar
              onClick={() => selectStar(2)}
              size={25}
              color="rgba(171, 171, 171, 0.324)"
            />{" "}
            <FaStar
              onClick={() => selectStar(3)}
              size={25}
              color="rgba(171, 171, 171, 0.324)"
            />{" "}
            <FaStar
              onClick={() => selectStar(4)}
              size={25}
              color="rgba(171, 171, 171, 0.324)"
            />{" "}
            <FaStar
              onClick={() => selectStar(5)}
              size={25}
              color="rgba(171, 171, 171, 0.324)"
            />
          </div>
        )}
        {starsSelected === 1 && (
          <div className="stars">
            <FaStar onClick={() => selectStar(1)} size={25} color="#FFD700" />{" "}
            <FaStar
              onClick={() => selectStar(2)}
              size={25}
              color="rgba(171, 171, 171, 0.324)"
            />{" "}
            <FaStar
              onClick={() => selectStar(3)}
              size={25}
              color="rgba(171, 171, 171, 0.324)"
            />{" "}
            <FaStar
              onClick={() => selectStar(4)}
              size={25}
              color="rgba(171, 171, 171, 0.324)"
            />{" "}
            <FaStar
              onClick={() => selectStar(5)}
              size={25}
              color="rgba(171, 171, 171, 0.324)"
            />
          </div>
        )}
        {starsSelected === 2 && (
          <div className="stars">
            <FaStar onClick={() => selectStar(1)} size={25} color="#FFD700" />{" "}
            <FaStar onClick={() => selectStar(2)} size={25} color="#FFD700" />{" "}
            <FaStar
              onClick={() => selectStar(3)}
              size={25}
              color="rgba(171, 171, 171, 0.324)"
            />{" "}
            <FaStar
              onClick={() => selectStar(4)}
              size={25}
              color="rgba(171, 171, 171, 0.324)"
            />{" "}
            <FaStar
              onClick={() => selectStar(5)}
              size={25}
              color="rgba(171, 171, 171, 0.324)"
            />
          </div>
        )}
        {starsSelected === 3 && (
          <div className="stars">
            <FaStar onClick={() => selectStar(1)} size={25} color="#FFD700" />{" "}
            <FaStar onClick={() => selectStar(2)} size={25} color="#FFD700" />{" "}
            <FaStar onClick={() => selectStar(3)} size={25} color="#FFD700" />{" "}
            <FaStar
              onClick={() => selectStar(4)}
              size={25}
              color="rgba(171, 171, 171, 0.324)"
            />{" "}
            <FaStar
              onClick={() => selectStar(5)}
              size={25}
              color="rgba(171, 171, 171, 0.324)"
            />
          </div>
        )}
        {starsSelected === 4 && (
          <div className="stars">
            <FaStar onClick={() => selectStar(1)} size={25} color="#FFD700" />{" "}
            <FaStar onClick={() => selectStar(2)} size={25} color="#FFD700" />{" "}
            <FaStar onClick={() => selectStar(3)} size={25} color="#FFD700" />{" "}
            <FaStar onClick={() => selectStar(4)} size={25} color="#FFD700" />{" "}
            <FaStar
              onClick={() => selectStar(5)}
              size={25}
              color="rgba(171, 171, 171, 0.324)"
            />
          </div>
        )}
        {starsSelected === 5 && (
          <div className="stars">
            <FaStar onClick={() => selectStar(1)} size={25} color="#FFD700" />{" "}
            <FaStar onClick={() => selectStar(2)} size={25} color="#FFD700" />{" "}
            <FaStar onClick={() => selectStar(3)} size={25} color="#FFD700" />{" "}
            <FaStar onClick={() => selectStar(4)} size={25} color="#FFD700" />{" "}
            <FaStar onClick={() => selectStar(5)} size={25} color="#FFD700" />
          </div>
        )}
        <div className="comment">
          <FormInput
            {...inputTitle}
            value={title}
            onChange={handleChangeTitle}
          />
        </div>
        <div className="comment">
          <FormInput
            {...inputComment}
            value={comment}
            onChange={handleChangeComment}
          />
        </div>
        <div className="btn-container">
          <button
            onClick={() => {
              leaveReview();
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

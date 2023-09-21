import React, { useEffect, useState } from "react";
import "../styles/ConversationData.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ConversationData({
  selectedConversation,
  socket,
  setShowConversationData,
}) {
  const [user, setUser] = useState();
  const { username } = useParams();
  const [friendUsername, setFriendUsername] = useState("");

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (selectedConversation) {
      setFriendUsername(
        selectedConversation.members.find((member) => member !== username)
      );
    }
  }, [selectedConversation]);

  useEffect(() => {
    if (friendUsername) {
      const data = { username: friendUsername };
      axios
        .post("http://localhost:5000/users/searchByUsername", data)
        .then((result) => {
          setUser(result.data);

          axios
            .post("http://localhost:5000/messages/getAllAttachments", {
              conversationID: selectedConversation._id,
            })
            .then((result) => {
              setImages(result.data.images);
              setVideos(result.data.videos);
              setDocuments(result.data.documents);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  }, [friendUsername]);

  const hideConversationData = () => {
    setShowConversationData(false);
  };

  const viewProfile = () => {
    window.location.href = `http://localhost:3000/mySphere/profile/${friendUsername}`;
  };

  return (
    <div className="ConversationData">
      <div className="header">
        <div className="back-btn">
          <svg
            onClick={() => hideConversationData()}
            height={20}
            width={20}
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill="#000000"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              ></path>
              <path
                fill="#000000"
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              ></path>
            </g>
          </svg>
        </div>
        <div className="user-info">
          {user && (
            <>
              <img src={user.profilePicture} alt="" className="profile-pic" />
              <div className="name">{user.name}</div>
              <div className="username">@{user.username}</div>
              <button
                onClick={() => {
                  viewProfile();
                }}
              >
                View profile
              </button>
            </>
          )}
        </div>
      </div>

      <div className="data-container">
        <div className="data">
          <div className="title">
            <div className="title-text">Images</div>
            {images && (
              <div className="number">
                <span className="dot"></span>
                {images.length === 0 && <div className="text">0 images</div>}
                {images.length === 1 && <div className="text">1 image</div>}
                {images.length > 1 && (
                  <div className="text">{images.length} images</div>
                )}
              </div>
            )}
          </div>
          <div className="images">
            {images.map((image, index) => (
              <div className="image">
                <img src={image} alt="" className="shared-pic" />
              </div>
            ))}
          </div>
        </div>
        <div className="data">
          <div className="title">
            <div className="title-text">Videos</div>
            {videos && (
              <div className="number">
                <span className="dot"></span>
                {videos.length === 0 && <div className="text">0 videos</div>}
                {videos.length === 1 && <div className="text">1 video</div>}
                {videos.length > 1 && (
                  <div className="text">{videos.length} videos</div>
                )}
              </div>
            )}
          </div>
          <div className="images">
            {videos.map((video, index) => (
              <div className="image">
                <video src={video} className="shared-pic" controls />
              </div>
            ))}
          </div>
        </div>
        <div className="data">
          <div className="title">
            <div className="title-text">Documents</div>
            {documents && (
              <div className="number">
                <span className="dot"></span>
                {documents.length === 0 && (
                  <div className="text">0 documents</div>
                )}
                {documents.length === 1 && (
                  <div className="text">1 document</div>
                )}
                {documents.length > 1 && (
                  <div className="text">{documents.length} documents</div>
                )}
              </div>
            )}
          </div>
          <div className="documents">
            {documents.map((document, index) => (
              <div className="document">
                <a href={document.url}>
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
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V4C19 3.44772 18.5523 3 18 3ZM6.41421 7H9V4.41421L6.41421 7ZM7 13C7 12.4477 7.44772 12 8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13ZM7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z"
                        fill="#ffffff"
                      ></path>{" "}
                    </g>
                  </svg>
                  <div className="name">{document.name}</div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

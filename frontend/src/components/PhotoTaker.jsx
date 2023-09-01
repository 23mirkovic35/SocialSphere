import React, { useState, useEffect, useRef } from "react";
import "../styles/PhotoTaker.css";
import { FaArrowsRotate, FaCheck } from "react-icons/fa6";

export default function PhotoTaker(props) {
  const { setPhotoURL, setIsTakingPhoto, setImage } = props;
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => console.log(error));
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);
    let video = videoRef.current;
    let photo = photoRef.current;
    photo.width = width;
    photo.height = height;
    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    const photoURL = photo.toDataURL("image/png");
    const imageObject = new Image();
    imageObject.src = photoURL;
    photo.toBlob((blob) => {
      setImage(blob);
    }, "image/jpeg");
    setPhotoURL(photoURL);
    setHasPhoto(true);
  };

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };

  const acceptPhoto = () => {
    setIsTakingPhoto(false);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className="PhotoTaker">
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={takePhoto}>SNAP!</button>
      </div>
      <div className={"result" + (hasPhoto ? " hasPhoto" : "")}>
        <canvas ref={photoRef}></canvas>
        <div className="btn-container">
          <button onClick={acceptPhoto}>
            <FaCheck />
          </button>
          <button onClick={closePhoto}>
            <FaArrowsRotate />
          </button>
        </div>
      </div>
    </div>
  );
}

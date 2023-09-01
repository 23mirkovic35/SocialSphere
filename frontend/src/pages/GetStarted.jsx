import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "../styles/GetStarted.css";
import FormInput from "../components/FormInput";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Logo from "../components/Logo";
import axios from "axios";
import PhotoTaker from "../components/PhotoTaker";
import Popup from "../components/Popup";
import { storage } from "../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const noImg =
  "https://firebasestorage.googleapis.com/v0/b/socialsphere-2023.appspot.com/o/noProfilePicture.png?alt=media&token=89213a03-4800-4116-bb5a-c3429bff03cb";

function GetStarted() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [photoURL, setPhotoURL] = useState(noImg);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    birthday: "",
    city: "",
    country: "",
  });
  const [popup, setPopup] = useState({
    show: false,
    text: "",
    type: "",
  });

  const inputs = [
    {
      id: 0,
      type: "text",
      name: "name",
      label: "Name",
    },
    {
      id: 1,
      type: "date",
      name: "birthday",
      label: "Birthday",
    },
    {
      id: 2,
      type: "text",
      name: "city",
      label: "City",
    },
    {
      id: 3,
      type: "text",
      name: "country",
      label: "Country",
    },
  ];

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const imgSelect = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event) => {
      setPhotoURL(event.target.result);
    };
  };

  function DB_update() {
    axios
      .post("http://localhost:5000/users/getStartedUpdate", {
        username: username,
        ...data,
      })
      .then((result) => {
        setPopup({
          show: true,
          text: "Congratulations! Your account is setup and ready to use",
          type: "info",
        });
        setTimeout(() => {
          localStorage.setItem("user", username);
          navigate("/mySphere");
        }, 5000);
      })
      .catch((error) => console.log(error));
  }

  const goNext = () => {
    if (data.name === "")
      setPopup({
        show: true,
        text: "Please enter your name.",
        type: "error",
      });
    else {
      const imgPickerDiv = document.getElementById("image-picker");
      const userInfoDiv = document.getElementById("user-info");
      imgPickerDiv.classList.remove("hide");
      userInfoDiv.classList.add("hide");
    }
  };

  const goBack = () => {
    const imgPickerDiv = document.getElementById("image-picker");
    const userInfoDiv = document.getElementById("user-info");
    imgPickerDiv.classList.add("hide");
    userInfoDiv.classList.remove("hide");
  };

  const uploadtImage = () => {
    if (photoURL === noImg) return;
    let imgName = username + "_" + new Date().getTime();
    const imgRef = ref(storage, `${username}/images/profile/${imgName}`);
    uploadBytes(imgRef, image)
      .then(() => {
        getDownloadURL(imgRef).then((url) => {
          let dataCopy = data;
          dataCopy.image = url;
          setData(dataCopy);
          DB_update();
        });
      })
      .catch((error) => console.log(error));
    console.log(imgName);
  };

  const handleSubmit = () => {
    uploadtImage();
  };

  return (
    <div className="GetStarted">
      {popup.show === true && <Popup {...popup} close={setPopup} />}
      <div className="wrapper">
        <div className="logo-container">
          <Logo isHome={false} />
        </div>
        <div className="user-info" id="user-info">
          {inputs.map((input) => (
            <div className="input" key={input.id}>
              <FormInput
                {...input}
                value={data[input.name]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="btn-container">
            <button onClick={goNext}>
              <div className="btn-text">Next</div> <FaArrowRight size={16} />
            </button>
          </div>
        </div>
        <div className="image-picker hide" id="image-picker">
          <div className="title">Pick a profile photo </div>
          <input type="file" name="picker" id="picker" onChange={imgSelect} />
          <div className="options">
            <label htmlFor="picker" id="upload">
              Upload photo 📤
            </label>
            <label
              onClick={() => {
                setIsTakingPhoto(true);
              }}
            >
              Take a photo 📸{" "}
            </label>
          </div>
          <img src={photoURL} alt="" height={250} width={250} />
          <div className="btn-container">
            <button onClick={goBack}>
              <FaArrowLeft size={16} />
              <div className="btn-text">Back</div>
            </button>
            <button>
              <div className="btn-text" onClick={handleSubmit}>
                Finish
              </div>{" "}
              <FaArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
      {isTakingPhoto && (
        <PhotoTaker
          setPhotoURL={setPhotoURL}
          setImage={setImage}
          setIsTakingPhoto={setIsTakingPhoto}
        />
      )}
    </div>
  );
}

export default GetStarted;

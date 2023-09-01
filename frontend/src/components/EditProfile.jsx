import React, { useEffect, useState } from "react";
import "../styles/EditProfile.css";
import axios from "axios";
import { storage } from "../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditProfile(props) {
  const {
    username,
    profilePicture,
    backgroundPicture,
    name,
    birthday,
    city,
    country,
    biography,
    instagram,
    facebook,
    twitter,
    tiktok,
    snapchat,
    setIsEdit,
  } = props;
  const [newName, setNewName] = useState("");
  const [newBiography, setNewBiography] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newBirthday, setNewBirthday] = useState("");
  const [newInstagram, setNewInstagram] = useState("");
  const [newFacebook, setNewFacebook] = useState("");
  const [newTwitter, setNewTwitter] = useState("");
  const [newTiktok, setNewTiktok] = useState("");
  const [newSnapchat, setNewSnapchat] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState("");
  const [newBackgroundPicture, setNewBackgroundPicture] = useState("");
  const [imageProfile, setImageProfile] = useState(null);
  const [imageBackground, setImageBackground] = useState(null);

  useEffect(() => {
    setNewName(name);
    setNewBiography(biography);
    setNewCity(city);
    setNewCountry(country);
    setNewBirthday(birthday);
    setNewInstagram(instagram);
    setNewFacebook(facebook);
    setNewTwitter(twitter);
    setNewTiktok(tiktok);
    setNewSnapchat(snapchat);
    setNewProfilePicture(profilePicture);
    setNewBackgroundPicture(backgroundPicture);
  }, [props]);
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleBiographyChange = (event) => {
    setNewBiography(event.target.value);
  };
  const handleCityChange = (event) => {
    setNewCity(event.target.value);
  };
  const handleCountryChange = (event) => {
    setNewCountry(event.target.value);
  };
  const handleBirthdayChange = (event) => {
    setNewBirthday(event.target.value);
  };
  const handleInstagramChange = (event) => {
    setNewInstagram(event.target.value);
  };
  const handleFacebookChange = (event) => {
    setNewFacebook(event.target.value);
  };
  const handleTwitterChange = (event) => {
    setNewTwitter(event.target.value);
  };
  const handleTiktokChange = (event) => {
    setNewTiktok(event.target.value);
  };
  const handleSnapchatChange = (event) => {
    setNewSnapchat(event.target.value);
  };
  const profileImageChange = (e) => {
    setImageProfile(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event) => {
      setNewProfilePicture(event.target.result);
    };
  };
  const backgroundImageChange = (e) => {
    setImageBackground(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event) => {
      setNewBackgroundPicture(event.target.result);
    };
  };
  async function uploadProfileImage() {
    let imgName = username + "_" + new Date().getTime();
    const imgRef = ref(storage, `${username}/images/profile/${imgName}`);
    try {
      await uploadBytes(imgRef, imageProfile);
      const url = await getDownloadURL(imgRef);
      return url;
    } catch (error) {
      console.error(error);
      return "";
    }
  }
  async function uploadBackgroundImage() {
    let imgName = username + "_" + new Date().getTime();
    const imgRef = ref(storage, `${username}/images/background/${imgName}`);
    try {
      await uploadBytes(imgRef, imageBackground);
      const url = await getDownloadURL(imgRef);
      return url;
    } catch (error) {
      console.error(error);
      return "";
    }
  }
  async function DB_updateUserData(event) {
    const newData = {
      username: username,
      backgroundPicture: backgroundPicture,
      profilePicture: profilePicture,
      name: newName,
      birthday: newBirthday,
      city: newCity,
      country: newCountry,
      biography: newBiography,
      instagram: newInstagram,
      facebook: newFacebook,
      twitter: newTwitter,
      tiktok: newTiktok,
      snapchat: newSnapchat,
    };
    if (newProfilePicture !== profilePicture)
      newData.profilePicture = await uploadProfileImage();
    if (newBackgroundPicture !== profilePicture)
      newData.backgroundPicture = await uploadBackgroundImage();
    axios.post("http://localhost:5000/users/updateUserData", newData);
    window.location.reload();
  }
  return (
    <div className="EditProfile">
      <div className="wrapper">
        <div className="images">
          <div className="background">
            <input
              type="file"
              name="bgImg"
              id="bgImg"
              onChange={backgroundImageChange}
            />
            <label htmlFor="bgImg">
              <img id="backgroundImg" src={newBackgroundPicture} alt="" />
            </label>
          </div>
          <div className="profile">
            <input
              type="file"
              name="profileImg"
              id="profileImg"
              onChange={profileImageChange}
            />
            <label htmlFor="profileImg">
              <img id="profileImg" src={newProfilePicture} alt="" />
            </label>
          </div>
        </div>
        <div className="user-name">
          <input type="checkbox" name="cb_name" id="cb_name" />
          <label htmlFor="cb_name">
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
                  d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </label>
          <div className="name">{newName}</div>
          <input
            type="text"
            name="name"
            id="name"
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <span className="horizontal-line"></span>
        <div className="user-info">
          <div className="title">Biography</div>
          <div className="biography">
            <textarea
              name="ta-bio"
              id="ta-bio"
              cols={30}
              rows={5}
              value={newBiography}
              onChange={handleBiographyChange}
            ></textarea>
          </div>
          <div className="location">
            <div className="subtitle">
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
                    d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <div className="text">Location</div>
            </div>
            <ul>
              <li>
                <input type="checkbox" name="cb_city" id="cb_city" />
                <div className="city">City</div>
                <div className="value">{newCity}</div>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={newCity}
                  onChange={handleCityChange}
                />
                <label htmlFor="cb_city">
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
                        d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                        stroke="#000000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                        stroke="#000000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </label>
              </li>
              <li>
                <input type="checkbox" name="cb_country" id="cb_country" />
                <div className="country">Country</div>
                <div className="value">{newCountry}</div>
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={newCountry}
                  onChange={handleCountryChange}
                />
                <label htmlFor="cb_country">
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
                        d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                        stroke="#000000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                        stroke="#000000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </label>
              </li>
            </ul>
          </div>
          <div className="birthday">
            <div className="subtitle">
              <svg
                height={20}
                width={20}
                fill="#000000"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="796 796 200 200"
                enable-background="new 796 796 200 200"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <path d="M986.55,972.536h-9.635v-61.1c0-14.9-10.702-27.347-24.824-30.06c-0.758-0.145-1.308-0.808-1.308-1.58v-35.494 c0-5.074-4.113-9.187-9.188-9.187c-5.073,0-9.188,4.113-9.188,9.187v34.913c0,0.89-0.721,1.61-1.61,1.61h-24.241 c-0.89,0-1.61-0.721-1.61-1.61v-34.913c0-5.074-4.113-9.187-9.188-9.187c-5.075,0-9.188,4.113-9.188,9.187v34.913 c0,0.89-0.721,1.61-1.611,1.61h-24.241c-0.89,0-1.611-0.721-1.611-1.61v-34.913c0-5.074-4.113-9.187-9.188-9.187 s-9.188,4.113-9.188,9.187v35.591c0,0.763-0.536,1.419-1.283,1.575c-13.893,2.892-24.365,15.229-24.365,29.967v61.1h-9.633 c-4.769,0-8.635,3.865-8.635,8.635c0,4.768,3.866,8.634,8.635,8.634H986.55c4.768,0,8.634-3.866,8.634-8.634 C995.184,976.401,991.317,972.536,986.55,972.536z M845.694,892.782h100.611c10.285,0,18.654,8.368,18.654,18.654v16.425 c0,0.89-0.722,1.61-1.611,1.61H828.65c-0.89,0-1.611-0.721-1.611-1.61v-16.425C827.039,901.15,835.408,892.782,845.694,892.782z M827.039,943.038c0-0.89,0.721-1.611,1.611-1.611h134.698c0.89,0,1.611,0.722,1.611,1.611v27.887c0,0.89-0.722,1.611-1.611,1.611 H828.65c-0.89,0-1.611-0.722-1.611-1.611V943.038z"></path>{" "}
                    <path d="M849.916,830.671c2.423,0,4.611-0.996,6.186-2.598l0,0c0.011-0.011,0.019-0.024,0.031-0.036 c0.211-0.217,0.408-0.445,0.596-0.684c0,0,0-0.001,0.001-0.002c0.186-0.236,0.358-0.482,0.519-0.735 c0.009-0.016,0.018-0.031,0.027-0.045c0.146-0.235,0.281-0.475,0.405-0.724c0.013-0.024,0.025-0.05,0.036-0.076 c0.114-0.234,0.217-0.472,0.31-0.717c0.013-0.037,0.027-0.075,0.041-0.11c0.079-0.219,0.15-0.442,0.212-0.668 c0.023-0.085,0.045-0.171,0.065-0.257c0.037-0.15,0.072-0.302,0.099-0.455c1.479-7.534-5.868-17.257-8.972-20.077 c-3.185-2.894-6.353-0.494-4.615,2.905c1.953,3.816,1.557,6.402-0.974,9.376c-0.291,0.28-0.557,0.583-0.807,0.902 c-0.013,0.014-0.024,0.028-0.038,0.043l0.003,0.004c-1.125,1.462-1.799,3.289-1.799,5.276 C841.24,826.787,845.124,830.671,849.916,830.671z"></path>{" "}
                    <path d="M895.735,830.671c2.423,0,4.612-0.996,6.187-2.598v0c0.012-0.011,0.021-0.024,0.03-0.036 c0.211-0.217,0.408-0.445,0.597-0.684c0.001,0,0.001-0.001,0.001-0.002c0.186-0.236,0.358-0.482,0.52-0.735 c0.008-0.016,0.018-0.031,0.026-0.045c0.146-0.235,0.28-0.475,0.404-0.724c0.013-0.024,0.024-0.05,0.036-0.076 c0.114-0.234,0.215-0.472,0.309-0.717c0.013-0.037,0.028-0.075,0.042-0.11c0.077-0.219,0.149-0.442,0.211-0.668 c0.023-0.085,0.045-0.171,0.066-0.257c0.036-0.15,0.07-0.302,0.099-0.455c1.478-7.534-5.869-17.257-8.974-20.077 c-3.185-2.894-6.354-0.494-4.615,2.905c1.953,3.816,1.558,6.402-0.974,9.376c-0.29,0.28-0.557,0.583-0.806,0.902 c-0.014,0.014-0.024,0.028-0.039,0.043l0.004,0.004c-1.125,1.462-1.8,3.289-1.8,5.276 C887.06,826.787,890.943,830.671,895.735,830.671z"></path>{" "}
                    <path d="M941.573,830.671c2.423,0,4.612-0.996,6.188-2.598v0c0.01-0.011,0.019-0.024,0.028-0.036 c0.212-0.217,0.41-0.445,0.598-0.684c0.002,0,0.002-0.001,0.002-0.002c0.186-0.236,0.357-0.482,0.518-0.735 c0.009-0.016,0.019-0.031,0.026-0.045c0.146-0.235,0.282-0.475,0.404-0.724c0.014-0.024,0.025-0.05,0.037-0.076 c0.113-0.234,0.216-0.472,0.309-0.717c0.013-0.037,0.027-0.075,0.041-0.11c0.078-0.219,0.149-0.442,0.212-0.668 c0.023-0.085,0.046-0.171,0.064-0.257c0.038-0.15,0.072-0.302,0.101-0.455c1.478-7.534-5.869-17.257-8.975-20.077 c-3.184-2.894-6.352-0.494-4.613,2.905c1.952,3.816,1.558,6.402-0.976,9.376c-0.29,0.28-0.557,0.583-0.807,0.902 c-0.013,0.014-0.023,0.028-0.039,0.043l0.006,0.004c-1.124,1.462-1.801,3.289-1.801,5.276 C932.897,826.787,936.781,830.671,941.573,830.671z"></path>{" "}
                  </g>{" "}
                </g>
              </svg>
              <div className="text">Birthday</div>
              <input type="checkbox" name="cb_birthday" id="cb_birthday" />
              <div className="value">{newBirthday}</div>
              <input
                type="date"
                name="birthday"
                id="birthday"
                value={newBirthday}
                onChange={handleBirthdayChange}
              />

              <label htmlFor="cb_birthday">
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
                      d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </label>
            </div>
          </div>
          <div className="add-social-media">
            <div className="title">Social Media</div>
            <div className="social-app">
              <input
                type="checkbox"
                className="username-input"
                name="cb_instagram"
                id="cb_instagram"
              />
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
                    d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                    fill="#000000"
                  ></path>{" "}
                  <path
                    d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                    fill="#000000"
                  ></path>{" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>
              <div className="value">{newInstagram}</div>
              <input
                type="text"
                name="instagram"
                id="instagram"
                value={newInstagram}
                onChange={handleInstagramChange}
              />
              <label htmlFor="cb_instagram">
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
                      d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </label>
            </div>
            <div className="social-app">
              {" "}
              <input type="checkbox" name="cb_facebook" id="cb_facebook" />
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
                    d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H15V13.9999H17.0762C17.5066 13.9999 17.8887 13.7245 18.0249 13.3161L18.4679 11.9871C18.6298 11.5014 18.2683 10.9999 17.7564 10.9999H15V8.99992C15 8.49992 15.5 7.99992 16 7.99992H18C18.5523 7.99992 19 7.5522 19 6.99992V6.31393C19 5.99091 18.7937 5.7013 18.4813 5.61887C17.1705 5.27295 16 5.27295 16 5.27295C13.5 5.27295 12 6.99992 12 8.49992V10.9999H10C9.44772 10.9999 9 11.4476 9 11.9999V12.9999C9 13.5522 9.44771 13.9999 10 13.9999H12V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>
              <div className="value">{newFacebook}</div>
              <input
                type="text"
                name="facebook"
                id="facebook"
                value={newFacebook}
                onChange={handleFacebookChange}
              />
              <label htmlFor="cb_facebook">
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
                      d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </label>
            </div>
            <div className="social-app">
              <input type="checkbox" name="cb_twitter" id="cb_twitter" />
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
                    d="M19.7828 3.91825C20.1313 3.83565 20.3743 3.75444 20.5734 3.66915C20.8524 3.54961 21.0837 3.40641 21.4492 3.16524C21.7563 2.96255 22.1499 2.9449 22.4739 3.11928C22.7979 3.29366 23 3.6319 23 3.99986C23 5.08079 22.8653 5.96673 22.5535 6.7464C22.2911 7.40221 21.9225 7.93487 21.4816 8.41968C21.2954 11.7828 20.3219 14.4239 18.8336 16.4248C17.291 18.4987 15.2386 19.8268 13.0751 20.5706C10.9179 21.3121 8.63863 21.4778 6.5967 21.2267C4.56816 20.9773 2.69304 20.3057 1.38605 19.2892C1.02813 19.0108 0.902313 18.5264 1.07951 18.109C1.25671 17.6916 1.69256 17.4457 2.14144 17.5099C3.42741 17.6936 4.6653 17.4012 5.6832 16.9832C5.48282 16.8742 5.29389 16.7562 5.11828 16.6346C4.19075 15.9925 3.4424 15.1208 3.10557 14.4471C2.96618 14.1684 2.96474 13.8405 3.10168 13.5606C3.17232 13.4161 3.27562 13.293 3.40104 13.1991C2.04677 12.0814 1.49999 10.5355 1.49999 9.49986C1.49999 9.19192 1.64187 8.90115 1.88459 8.71165C1.98665 8.63197 2.10175 8.57392 2.22308 8.53896C2.12174 8.24222 2.0431 7.94241 1.98316 7.65216C1.71739 6.3653 1.74098 4.91284 2.02985 3.75733C2.1287 3.36191 2.45764 3.06606 2.86129 3.00952C3.26493 2.95299 3.6625 3.14709 3.86618 3.50014C4.94369 5.36782 6.93116 6.50943 8.78086 7.18568C9.6505 7.50362 10.4559 7.70622 11.0596 7.83078C11.1899 6.61019 11.5307 5.6036 12.0538 4.80411C12.7439 3.74932 13.7064 3.12525 14.74 2.84698C16.5227 2.36708 18.5008 2.91382 19.7828 3.91825ZM10.7484 9.80845C10.0633 9.67087 9.12171 9.43976 8.09412 9.06408C6.7369 8.56789 5.16088 7.79418 3.84072 6.59571C3.86435 6.81625 3.89789 7.03492 3.94183 7.24766C4.16308 8.31899 4.5742 8.91899 4.94721 9.10549C5.40342 9.3336 5.61484 9.8685 5.43787 10.3469C5.19827 10.9946 4.56809 11.0477 3.99551 10.9046C4.45603 11.595 5.28377 12.2834 6.66439 12.5135C7.14057 12.5929 7.49208 13.0011 7.49986 13.4838C7.50765 13.9665 7.16949 14.3858 6.69611 14.4805L5.82565 14.6546C5.95881 14.7703 6.103 14.8838 6.2567 14.9902C6.95362 15.4727 7.65336 15.6808 8.25746 15.5298C8.70991 15.4167 9.18047 15.6313 9.39163 16.0472C9.60278 16.463 9.49846 16.9696 9.14018 17.2681C8.49626 17.8041 7.74425 18.2342 6.99057 18.5911C6.63675 18.7587 6.24134 18.9241 5.8119 19.0697C6.14218 19.1402 6.48586 19.198 6.84078 19.2417C8.61136 19.4594 10.5821 19.3126 12.4249 18.6792C14.2614 18.0479 15.9589 16.9385 17.2289 15.2312C18.497 13.5262 19.382 11.1667 19.5007 7.96291C19.51 7.71067 19.6144 7.47129 19.7929 7.29281C20.2425 6.84316 20.6141 6.32777 20.7969 5.7143C20.477 5.81403 20.1168 5.90035 19.6878 5.98237C19.3623 6.04459 19.0272 5.94156 18.7929 5.70727C18.0284 4.94274 16.5164 4.43998 15.2599 4.77822C14.6686 4.93741 14.1311 5.28203 13.7274 5.89906C13.3153 6.52904 13 7.51045 13 8.9999C13 9.28288 12.8801 9.5526 12.6701 9.74221C12.1721 10.1917 11.334 9.92603 10.7484 9.80845Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>
              <div className="value">{newTwitter}</div>
              <input
                type="text"
                name="twitter"
                id="twitter"
                value={newTwitter}
                onChange={handleTwitterChange}
              />
              <label htmlFor="cb_twitter">
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
                      d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </label>
            </div>
            <div className="social-app">
              <input type="checkbox" name="cb_tiktok" id="cb_tiktok" />
              <svg
                height={20}
                width={20}
                fill="#000000"
                viewBox="0 0 512 512"
                id="icons"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"></path>
                </g>
              </svg>
              <div className="value">{newTiktok}</div>
              <input
                type="text"
                name="tiktok"
                id="tiktok"
                value={newTiktok}
                onChange={handleTiktokChange}
              />
              <label htmlFor="cb_tiktok">
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
                      d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </label>
            </div>
            <div className="social-app">
              <input type="checkbox" name="cb_snapchat" id="cb_snapchat" />
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
                    d="M21.9756 17.1497C21.8884 16.8566 21.4712 16.6499 21.4712 16.6499C21.4317 16.6288 21.3965 16.6099 21.3674 16.5951C20.672 16.2535 20.0555 15.8423 19.5365 15.3762C19.1193 15.0008 18.7623 14.5875 18.4758 14.1489C18.125 13.6132 17.961 13.1662 17.8904 12.9237C17.851 12.7655 17.8572 12.7022 17.8904 12.62C17.9174 12.5504 17.9984 12.485 18.0357 12.4534C18.2703 12.2847 18.6481 12.0358 18.8806 11.884C19.0819 11.7512 19.2542 11.6373 19.3559 11.5656C19.6818 11.3336 19.906 11.0974 20.0368 10.8423C20.207 10.5133 20.2278 10.1506 20.0949 9.79418C19.9164 9.31337 19.4743 9.02657 18.9117 9.02657C18.7872 9.02657 18.6585 9.04133 18.5298 9.06875C18.208 9.14045 17.9029 9.25643 17.6475 9.35765C17.6289 9.36609 17.6081 9.35133 17.6102 9.33024C17.6372 8.68705 17.6683 7.82244 17.5977 7.00211C17.5355 6.25981 17.3839 5.63349 17.139 5.0873C16.892 4.53901 16.5702 4.13412 16.319 3.841C16.0803 3.56263 15.6589 3.15141 15.0237 2.78237C14.1311 2.2636 13.114 2 12.0013 2C10.8908 2 9.87572 2.2636 8.98105 2.78237C8.30849 3.1725 7.87879 3.61324 7.68367 3.841C7.4325 4.13412 7.11075 4.53901 6.86372 5.0873C6.6167 5.63349 6.46724 6.2577 6.40497 7.00211C6.33439 7.82666 6.36345 8.62168 6.39252 9.33024C6.39252 9.35133 6.37383 9.36609 6.35308 9.35765C6.09775 9.25643 5.79261 9.14045 5.47086 9.06875C5.34423 9.04133 5.21553 9.02657 5.08891 9.02657C4.52844 9.02657 4.08629 9.31337 3.9057 9.79418C3.77285 10.1506 3.7936 10.5133 3.96382 10.8423C4.09667 11.0974 4.31878 11.3336 4.64469 11.5656C4.74432 11.6373 4.91869 11.7512 5.12005 11.884C5.34631 12.0337 5.71373 12.2763 5.95037 12.4429C5.97943 12.4639 6.07907 12.5399 6.11021 12.62C6.14342 12.7043 6.14965 12.7676 6.10605 12.9363C6.0334 13.1809 5.86941 13.6238 5.52483 14.1489C5.23837 14.5896 4.88133 15.0008 4.46409 15.3762C3.94514 15.8423 3.32862 16.2535 2.63323 16.5951C2.60002 16.612 2.56057 16.631 2.51906 16.6563C2.51906 16.6563 2.1039 16.8714 2.02502 17.1497C1.90877 17.5609 2.21807 17.9469 2.53151 18.1535C3.04631 18.4909 3.67321 18.6723 4.03647 18.7714C4.13819 18.7988 4.22952 18.8241 4.31256 18.8494C4.36445 18.8663 4.49523 18.9169 4.55127 18.9907C4.62185 19.0835 4.63016 19.1974 4.65506 19.326C4.69451 19.5432 4.78377 19.811 5.04739 19.9966C5.33801 20.1991 5.70542 20.2138 6.17248 20.2328C6.6603 20.2518 7.26643 20.275 7.96183 20.5091C8.28358 20.6166 8.57627 20.8001 8.91255 21.011C9.61832 21.4517 10.4964 22 11.9951 22C13.4959 22 14.3802 21.4496 15.0901 21.0067C15.4264 20.798 15.715 20.6166 16.0305 20.5112C16.7259 20.2771 17.332 20.2539 17.8198 20.2349C18.2869 20.2159 18.6543 20.2033 18.9449 19.9987C19.2272 19.8005 19.3082 19.5053 19.3456 19.2838C19.3663 19.1742 19.3788 19.0751 19.441 18.9949C19.495 18.9253 19.6154 18.8768 19.6715 18.8579C19.7566 18.8305 19.8521 18.8051 19.9579 18.7756C20.3212 18.6765 20.7779 18.5605 21.3321 18.2421C22.0005 17.8562 22.0462 17.3838 21.9756 17.1497Z"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <div className="value">{newSnapchat}</div>
              <input
                type="text"
                name="snapchat"
                id="snapchat"
                value={newSnapchat}
                onChange={handleSnapchatChange}
              />
              <label htmlFor="cb_snapchat">
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
                      d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </label>
            </div>
          </div>
        </div>
        <div className="btn-container">
          <button
            id="save"
            onClick={(e) => {
              DB_updateUserData(e);
            }}
          >
            Save
          </button>
        </div>
        <div
          className="close"
          onClick={() => {
            setIsEdit(false);
          }}
        >
          <svg
            height={40}
            width={40}
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
                stroke="#FFFFFF"
                stroke-width="2"
                stroke-linecap="round"
              ></path>{" "}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

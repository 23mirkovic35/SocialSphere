import React, { useEffect, useState } from "react";
import "../styles/NewPostInput.css";
import axios from "axios";
import { storage } from "../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import EmojiSelector from "./EmojiSelector";

export default function NewPostInput(props) {
  const { myData, socket, setNewPosts, isGroup, groupId } = props;
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [photosURL, setPhotosURL] = useState([]);
  const uploadedImages = [];

  let textarea = undefined;

  useEffect(() => {
    textarea = document.querySelector("#autoresizing");
    textarea.addEventListener("input", autoResize, false);
  }, []);

  useEffect(() => {
    console.log(images);
  }, [images]);

  useEffect(() => {
    console.log(photosURL);
  }, [photosURL]);

  function autoResize() {
    if (this.value === "") {
      this.style.height = 20 + "px";
      return;
    }
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImagesChange = (e) => {
    console.log(e.target.files);
    for (let i = 0; i < e.target.files.length; i++) {
      setImages((prevState) => {
        return [...prevState, e.target.files[i]];
      });
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[i]);
      reader.onload = (event) => {
        setPhotosURL((prevState) => {
          return [...prevState, event.target.result];
        });
      };
    }
  };

  function removeImage(position) {
    setPhotosURL((prevState) => {
      let array = [
        ...prevState.slice(0, position),
        ...prevState.slice(position + 1),
      ];
      return array;
    });
    setImages((prevState) => {
      let array = [
        ...prevState.slice(0, position),
        ...prevState.slice(position + 1),
      ];
      return array;
    });
  }

  async function uploadImages() {
    for (let i = 0; i < images.length; i++) {
      let imgName = myData.username + "_" + new Date().getTime();
      const imgRef = isGroup
        ? ref(storage, `/groups/${groupId}/${imgName}`)
        : ref(storage, `${myData.username}/posts/${imgName}`);
      try {
        await uploadBytes(imgRef, images[i]);
        const url = await getDownloadURL(imgRef);
        uploadedImages.push(url);
        console.log(uploadedImages);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function handlePost() {
    let postType = 0;
    if (images.length > 0) {
      //   console.log(images.length);
      await uploadImages();
      postType = 1;
    }
    const data = {
      username: myData.username,
      type: postType,
      text: text,
      images: uploadedImages,
      videos: [],
      likes: [],
      comments: [],
      time: new Date(),
    };
    if (isGroup) {
      const response = await axios.post(
        "http://localhost:5000/groups/newPost",
        {
          ...data,
          groupId,
        }
      );
      setNewPosts((prevState) => {
        return [data, ...prevState];
      });
    } else {
      const response = await axios.post(
        "http://localhost:5000/posts/newPost",
        data
      );
      setNewPosts((prevState) => {
        return [data, ...prevState];
      });
      DB_addNotification(myData.username, 4);
      socket.emit("NewPostFromMe", {
        username: myData.username,
      });
    }
    restartFields();
  }

  const restartFields = () => {
    setText("");
    setImages([]);
    setPhotosURL([]);
  };

  async function DB_addNotification(username, type) {
    const data = {
      username: username,
      type: type,
    };
    console.log(data);
    await axios.post("http://localhost:5000/users/addNotification", data);
  }

  return (
    <div className="NewPostInput">
      <div className="input">
        <img src={myData.profilePicture} id="myProfilePicture-newPost" alt="" />
        <textarea
          value={text}
          name="autoresizing"
          placeholder="What's on your mind?"
          id="autoresizing"
          rows={1}
          onChange={handleTextChange}
        ></textarea>
        <span className="horizontal-line"></span>
        <div className="attachments">
          {photosURL.map((photo, index) => {
            return (
              <div className="attachment" key={index}>
                <img src={photo} alt="" />
                <div className="delete-img" onClick={() => removeImage(index)}>
                  <svg
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
                        d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
        <div className="btn-container">
          <div className="options">
            <input
              type="file"
              name="file_img"
              id="file_img"
              multiple
              onChange={handleImagesChange}
            />
            <label id="photo-label" htmlFor="file_img">
              <svg
                height={20}
                width={20}
                fill="#000000"
                viewBox="0 0 24 24"
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
                    d="M22,19 C22,20.6568542 20.6568542,22 19,22 L5,22 C3.34314575,22 2,20.6568542 2,19 L2,5 C2,3.34314575 3.34314575,2 5,2 L9.0005,2 C9.55250861,2 10,2.44749139 10,2.9995 C10,3.55154094 9.55254095,3.99908949 9.00050002,3.9991999 L5,4 C4.44771525,4 4,4.44771525 4,5 L4,18.278 L8.18626653,12.4187618 C8.50017051,11.9792962 9.09949173,11.8737129 9.54124102,12.158983 L9.6401844,12.2317787 L14.785,16.518 L16.1679497,14.4452998 C16.4946552,13.9552416 17.1635825,13.8584909 17.6141119,14.2105599 L17.7071068,14.2928932 L20,16.585 L20,15 C20,14.4477153 20.4477153,14 21,14 C21.5522847,14 22,14.4477153 22,15 L22,19 Z M9.187,14.458 L5.228,20 L19,20 C19.4289102,20 19.794752,19.7299721 19.9367986,19.3506434 L17.155,16.57 L15.8320503,18.5547002 C15.5242948,19.0163334 14.9063415,19.1337563 14.4540306,18.8379569 L14.3598156,18.7682213 L9.187,14.458 Z M17,2 C17.5522847,2 18,2.44771525 18,3 L18,6 L21,6 C21.5522847,6 22,6.44771525 22,7 C22,7.55228475 21.5522847,8 21,8 L18,8 L18,11 C18,11.5522847 17.5522847,12 17,12 C16.4477153,12 16,11.5522847 16,11 L16,8 L13,8 C12.4477153,8 12,7.55228475 12,7 C12,6.44771525 12.4477153,6 13,6 L16,6 L16,3 C16,2.44771525 16.4477153,2 17,2 Z M8,6 C9.1045695,6 10,6.8954305 10,8 C10,9.1045695 9.1045695,10 8,10 C6.8954305,10 6,9.1045695 6,8 C6,6.8954305 6.8954305,6 8,6 Z"
                  ></path>{" "}
                </g>
              </svg>
              <div className="text">Add Photo</div>
            </label>
            <input type="file" name="file_video" id="file_video" />
            <label htmlFor="file_video">
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
                    d="M22 9V15C22 15.23 22 15.45 21.98 15.67C21.94 15.61 21.89 15.55 21.84 15.5C21.83 15.49 21.82 15.47 21.81 15.46C21 14.56 19.81 14 18.5 14C17.24 14 16.09 14.52 15.27 15.36C14.48 16.17 14 17.28 14 18.5C14 19.34 14.24 20.14 14.65 20.82C14.87 21.19 15.15 21.53 15.47 21.81C15.49 21.82 15.5 21.83 15.51 21.84C15.56 21.89 15.61 21.93 15.67 21.98C15.46 22 15.23 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M2.52002 7.10986H21.48"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M8.52002 2.10986V6.96985"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M15.48 2.10986V6.5199"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M23 18.5C23 18.86 22.96 19.21 22.87 19.55C22.76 20 22.58 20.43 22.35 20.82C21.57 22.12 20.14 23 18.5 23C17.42 23 16.44 22.62 15.68 21.98C15.67 21.98 15.67 21.98 15.67 21.98C15.61 21.93 15.56 21.89 15.51 21.84C15.5 21.83 15.49 21.82 15.47 21.81C15.15 21.53 14.87 21.19 14.65 20.82C14.24 20.14 14 19.34 14 18.5C14 17.28 14.48 16.17 15.27 15.36C16.09 14.52 17.24 14 18.5 14C19.81 14 21 14.56 21.81 15.46C21.82 15.47 21.83 15.49 21.84 15.5C21.89 15.55 21.94 15.61 21.98 15.67C22.62 16.44 23 17.43 23 18.5Z"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M20.1801 18.48H16.8201"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M18.5 16.8401V20.2001"
                    stroke="#292D32"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <div className="text">Add Video</div>
            </label>
          </div>
          <label onClick={handlePost}>Post</label>
        </div>
      </div>
    </div>
  );
}

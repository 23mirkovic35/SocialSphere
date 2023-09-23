import axios from "axios";
import "../styles/Profile.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserAndSocket } from "./MySphere";
import PrivateAccount from "../components/PrivateAccount";
import UserData from "../components/UserData";
import EditProfile from "../components/EditProfile";
import Post from "../components/Post";
export default function Profile() {
  const navigator = useNavigate();
  const { username } = useParams();
  const { myData, socket } = useUserAndSocket();
  const [isFriend, setIsFriend] = useState(false);
  const [isPadding, setIsPadding] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [user, setUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [posts, setPosts] = useState([]);

  const myUsername = localStorage.getItem("user");

  useEffect(() => {
    if (username !== myData.username) {
      if (user.friends !== undefined && myData.myRequests !== undefined) {
        setIsFriend(
          user.friends.some(
            (friendUsername) => friendUsername === myData.username
          )
        );
        setIsPadding(
          myData.myRequests.some((friend) => friend === user.username)
        );
        setIsWaitingForResponse(
          myData.friendRequests.some((friend) => friend === user.username)
        );
        setIsMe(false);
      }
    } else {
      setIsFriend(false);
      setIsMe(true);
      setIsPadding(false);
    }
  }, [user]);

  useEffect(() => {
    DB_getData(username);
  }, [username]);

  useEffect(() => {
    console.log(isPadding);
  }, [isPadding]);

  async function DB_addFriendRequest() {
    await axios.post("http://localhost:5000/users/addFriendRequest", {
      myUsername: myData.username,
      friendUsername: username,
    });
    DB_addNotification(myData.username, 1);
  }

  async function DB_addNotification(username, type) {
    const data = {
      username: username,
      type: type,
    };
    console.log(data);
    await axios.post("http://localhost:5000/users/addNotification", data);
  }

  async function DB_getData(username) {
    const response = await axios.post(
      "http://localhost:5000/users/findUserByUsername",
      {
        username: username,
      }
    );
    setUser(response.data);
    const responsePosts = await axios.post(
      "http://localhost:5000/posts/userPosts",
      {
        username: username,
      }
    );

    const array = [];
    for (let i = 0; i < responsePosts.data.length; i++) {
      const element = responsePosts.data[i];
      array.unshift(element);
    }
    setPosts(array);
  }

  async function DB_removeFriendRequest() {
    await axios.post("http://localhost:5000/users/removeFriendRequest", {
      myUsername: myData.username,
      friendUsername: username,
    });
    setIsPadding(false);
  }

  const sendFriendRequest = () => {
    socket.emit("sendFriendRequest", {
      sender: myData.username,
      receiver: user.username,
    });
    DB_addFriendRequest();
    setIsPadding(true);
  };

  const cancleFriendRequest = () => {
    socket.emit("cancleFriendRequest", {
      sender: myData.username,
      receiver: user.username,
    });
    DB_removeFriendRequest();
    setIsPadding(true);
  };

  const handleAccpet = () => {
    console.log(
      myData.username + " has accepted friend request from " + username
    );
    socket.emit("acceptFriendRequest", {
      sender: myData.username,
      receiver: username,
    });
    const data = {
      myUsername: myData.username,
      friendUsername: username,
    };
    axios
      .post("http://localhost:5000/users/addFriend", data)
      .then((response) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
    setIsFriend(true);
    setIsWaitingForResponse(false);
  };

  const handleDecline = () => {
    const data = {
      myUsername: myData.username,
      friendUsername: username,
    };
    axios
      .post("http://localhost:5000/users/rejectFriendRequest", data)
      .then((response) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
    setIsWaitingForResponse(false);
  };

  function removeFriend() {
    DB_removeFriend();
  }

  async function DB_removeFriend() {
    try {
      const respones = await axios.post(
        "http://localhost:5000/users/removeFriend",
        {
          myUsername: myData.username,
          friendUsername: username,
        }
      );

      setIsFriend(false);
    } catch (error) {
      console.log(error);
    }
  }

  const linkToInstagram = () => {
    window.location.href = `https://www.instagram.com/${myData.instagram}`;
  };

  const linkToFacebook = () => {
    window.location.href = `https://www.facebook.com/${myData.facebook}`;
  };

  const linkToTiktok = () => {
    window.location.href = `https://www.tiktok.com/@${myData.tiktok}`;
  };

  const linkToSnapchat = () => {
    window.location.href = `https://www.snapchat.com/${myData.snapchat}`;
  };

  const linkToTwitter = () => {
    window.location.href = `https://www.twitter.com/${myData.twitter}`;
  };

  return (
    <div className="Profile">
      <div className="images">
        <div className="social-network">
          <span className="vertical-line"></span>
          <div className="field" onClick={linkToInstagram}>
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
                  fill="#FFFFFF"
                ></path>{" "}
                <path
                  d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                  fill="#FFFFFF"
                ></path>{" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                  fill="#FFFFFF"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="field" onClick={linkToFacebook}>
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
                  fill="#FFFFFF"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="field" onClick={linkToTwitter}>
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
                  fill="#FFFFFF"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="field" onClick={linkToTiktok}>
            <svg
              height={20}
              width={20}
              fill="#FFFFFF"
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
          </div>
          <div className="field" onClick={linkToSnapchat}>
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
                  stroke="#FFFFFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <span className="vertical-line"></span>
        </div>
        <img id="background-img" src={user.backgroundPicture} alt="" />
        <img id="profile-img" src={user.profilePicture} alt="" />
      </div>
      <div className="info">
        <div className="user">
          <div className="user-name">{user.name}</div>
          {!isMe && (
            <div className="friends-number">
              {isFriend && (
                <div className="number">{user.friends.length} friends</div>
              )}
              <span className="circle"></span>
              <div className="number">
                10 mutual
                {!isFriend && <div className="more-text">friends</div>}
              </div>
            </div>
          )}
        </div>
        <div className="btn-container">
          {isWaitingForResponse && (
            <>
              <button id="accept-request" onClick={handleAccpet}>
                <div className="btn-text">Accept</div>
              </button>
              <button id="decline-request" onClick={handleDecline}>
                <div className="btn-text">Decline</div>
              </button>
            </>
          )}
          {!isFriend && !isMe && isPadding && (
            <button onClick={cancleFriendRequest}>
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
                  <circle
                    cx="10"
                    cy="6"
                    r="4"
                    stroke="#ffffff"
                    stroke-width="1.5"
                  ></circle>{" "}
                  <path
                    d="M21 10H19H17"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    d="M17.9975 18C18 17.8358 18 17.669 18 17.5C18 15.0147 14.4183 13 10 13C5.58172 13 2 15.0147 2 17.5C2 19.9853 2 22 10 22C12.231 22 13.8398 21.8433 15 21.5634"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                </g>
              </svg>
              <div className="btn-text">Cancle request</div>
            </button>
          )}
          {!isFriend && !isMe && !isPadding && !isWaitingForResponse && (
            <button onClick={sendFriendRequest}>
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
                  <circle
                    cx="10"
                    cy="6"
                    r="4"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                  ></circle>{" "}
                  <path
                    d="M21 10H19M19 10H17M19 10L19 8M19 10L19 12"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    d="M17.9975 18C18 17.8358 18 17.669 18 17.5C18 15.0147 14.4183 13 10 13C5.58172 13 2 15.0147 2 17.5C2 19.9853 2 22 10 22C12.231 22 13.8398 21.8433 15 21.5634"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                </g>
              </svg>
              <div className="btn-text">Add friend</div>
            </button>
          )}
          {isFriend && (
            <>
              <button
                onClick={() => {
                  removeFriend();
                }}
              >
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
                    <circle
                      cx="12"
                      cy="6"
                      r="4"
                      stroke="#ffffff"
                      stroke-width="1.5"
                    ></circle>{" "}
                    <circle
                      cx="18"
                      cy="16"
                      r="4"
                      stroke="#ffffff"
                      stroke-width="1.5"
                    ></circle>{" "}
                    <path
                      d="M16.6665 16L17.5 17L19.3332 15.1111"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M15 13.3271C14.0736 13.1162 13.0609 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C17.6874 22 19.3315 20.9817 19.8068 19.5"
                      stroke="#ffffff"
                      stroke-width="1.5"
                    ></path>{" "}
                  </g>
                </svg>
                <div className="btn-text">Friends</div>
              </button>
              <button>
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
                      d="M22 6.25V11.35C22 12.62 21.58 13.69 20.83 14.43C20.09 15.18 19.02 15.6 17.75 15.6V17.41C17.75 18.09 16.99 18.5 16.43 18.12L15.46 17.48C15.55 17.17 15.59 16.83 15.59 16.47V12.4C15.59 10.36 14.23 9 12.19 9H5.39999C5.25999 9 5.13 9.01002 5 9.02002V6.25C5 3.7 6.7 2 9.25 2H17.75C20.3 2 22 3.7 22 6.25Z"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M15.59 12.4V16.47C15.59 16.83 15.55 17.17 15.46 17.48C15.09 18.95 13.87 19.87 12.19 19.87H9.47L6.45 21.88C6 22.19 5.39999 21.86 5.39999 21.32V19.87C4.37999 19.87 3.53 19.53 2.94 18.94C2.34 18.34 2 17.49 2 16.47V12.4C2 10.5 3.18 9.19002 5 9.02002C5.13 9.01002 5.25999 9 5.39999 9H12.19C14.23 9 15.59 10.36 15.59 12.4Z"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                <div className="btn-text">Message</div>
              </button>
            </>
          )}
          {isMe && (
            <button>
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
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                    stroke="#FFFFFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <div
                className="btn-text"
                onClick={() => {
                  console.log("edit profile");
                  setIsEdit(true);
                }}
              >
                Edit profile
              </div>
            </button>
          )}
        </div>
      </div>
      <span className="horizontal-line"></span>
      <div className="others">
        {!isFriend && !isMe && <PrivateAccount />}{" "}
        {(isFriend || isMe) && (
          <>
            <UserData {...user} />
            <div className="user-posts">
              {posts.map((post) => (
                <Post post={post} myUsername={myUsername} socket={socket} />
              ))}
            </div>
          </>
        )}
      </div>
      {isEdit && <EditProfile {...myData} setIsEdit={setIsEdit} />}
    </div>
  );
}

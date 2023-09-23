import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import LoginSignupPhoto from "../components/LoginSignupPhoto";
import FormInput from "../components/FormInput";
import Popup from "../components/Popup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ForgotPassword from "../components/ForgotPassword";

export default function Login() {
  const navigate = useNavigate();
  const [resetPassword, setReset] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
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
      name: "username",
      label: "Username",
    },
    {
      id: 1,
      type: "password",
      name: "password",
      label: "Password",
    },
  ];

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/mySphere");
  }, []);

  useEffect(() => {
    if (popup.show) setTimeout(() => setPopup(false), 5000);
  }, [popup.show]);

  function validateForm() {
    if (data.username === "") {
      setPopup({
        show: true,
        text: "Please enter your username.",
        type: "error",
      });
    } else if (data.password === "") {
      setPopup({
        show: true,
        text: "Please enter your passowrd.",
        type: "error",
      });
    } else {
      axios
        .post("http://localhost:5000/users/login", data)
        .then((response) => {
          if (response.data) {
            localStorage.setItem("user", response.data.username);
            navigate("/mySphere");
          } else {
            setPopup({
              show: true,
              text: "Please enter valid credentials.",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    validateForm();
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const startResetProcess = () => {
    if (data.username !== "") {
      setReset(true);
    } else {
      setPopup({
        show: true,
        text: "Please enter your username.",
        type: "error",
      });
    }
  };

  return (
    <div className="Login">
      <Popup {...popup} close={setPopup} />
      <div className="wrapper">
        <div className="form">
          <h1>Welcome to SocialSphere</h1>
          <p>Access Your Account and Connect Away!</p>
          <div className="input">
            <FormInput
              {...inputs[0]}
              value={data[inputs[0].name]}
              onChange={handleChange}
            />
            <svg
              height={20}
              width={20}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <circle
                  cx="12"
                  cy="6"
                  r="4"
                  stroke="#000000"
                  strokeWidth="1.9200000000000004"
                ></circle>{" "}
                <path
                  d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                  stroke="#000000"
                  strokeWidth="1.9200000000000004"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="input">
            <FormInput
              {...inputs[1]}
              value={data[inputs[1].name]}
              onChange={handleChange}
            />
            <svg
              height={20}
              width={20}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="container">
            <div className="remember-me">
              <div className="checkbox-wrapper-4">
                <input className="inp-cbx" id="morning" type="checkbox" />
                <label className="cbx" htmlFor="morning">
                  <span>
                    <svg width="12px" height="10px">
                      <use xlinkHref="#check-4"></use>
                    </svg>
                  </span>
                  <span>Remember me</span>
                </label>
                <svg className="inline-svg">
                  <symbol id="check-4" viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </symbol>
                </svg>
              </div>
            </div>
            <div
              className="forgot-password"
              onClick={() => startResetProcess()}
            >
              Forgot password?
            </div>
          </div>
          <button id="btn-login" onClick={handleSubmit}>
            Login
          </button>
          <div className="other-options">
            <span className="horizontalLine"></span>
            or
            <span className="horizontalLine"></span>
          </div>
          <Link to="/signup" id="signup">
            Create an account
          </Link>
        </div>
        <div className="image-side">
          <LoginSignupPhoto isLogin={true} />
        </div>
      </div>
      {resetPassword && (
        <ForgotPassword
          setPopup={setPopup}
          username={data.username}
          setReset={setReset}
        />
      )}
    </div>
  );
}

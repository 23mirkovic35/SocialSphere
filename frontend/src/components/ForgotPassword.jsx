import React, { useState } from "react";
import "../styles/ForgotPassword.css";
import FormInput from "./FormInput";
import axios from "axios";
export default function ForgotPassword({ username, setPopup, setReset }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [enterCode, setEnterCode] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [realCode, setRealCode] = useState("");
  const [newPassword, setNewPasword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const inputMail = {
    id: 0,
    type: "text",
    name: "email",
    label: "Email",
  };

  const inputCode = {
    id: 0,
    type: "text",
    name: "code",
    label: "Code",
  };

  const inputPassword = {
    id: 0,
    type: "password",
    name: "newPassword",
    label: "New Password",
  };
  const inputConfirmPassword = {
    id: 0,
    type: "password",
    name: "confirmPassword",
    label: "Confirm New Password",
  };

  const close = () => {
    setReset(false);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };

  const handleChangeNewPassword = (event) => {
    setNewPasword(event.target.value);
  };

  const handleChangeConfirmNewPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const sendCode = () => {
    if (email !== "") {
      if (validateEmail()) {
        sendMail();
      } else {
        setPopup({
          show: true,
          text: "Please enter valid email",
          type: "error",
        });
      }
    } else {
      setPopup({
        show: true,
        text: "Please enter your email",
        type: "error",
      });
    }
  };

  const checkCode = () => {
    if (code == realCode) {
      setResetPassword(true);
    } else {
      setPopup({
        show: true,
        text: "Please enter valid code",
        type: "error",
      });
    }
  };

  function sendMail() {
    // findUserByUsername;
    axios
      .post("http://localhost:5000/users/checkUsersEmail", {
        username: username,
        email: email,
      })
      .then((result) => {
        if (result.data === true) {
          axios
            .post("http://localhost:5000/send-mail/forgotPassword", {
              username: username,
              email: email,
            })
            .then((result) => {
              if (result.statusText === "OK") {
                setPopup({
                  show: true,
                  text: "Please check your email for a code to reset your password.",
                  type: "info",
                });
                setEnterCode(true);
                setRealCode(result.data);
              }
            })
            .catch((error) => console.log(error));
        } else {
          setPopup({
            show: true,
            text: "Please enter your real email",
            type: "error",
          });
        }
      })
      .catch((error) => console.log(error));
  }

  const resetPass = () => {
    if (newPassword !== "") {
      if (confirmPassword !== "") {
        if (newPassword === confirmPassword) {
          axios
            .post("http://localhost:5000/users/updatePassword", {
              username: username,
              newPassword: newPassword,
            })
            .then(() => {
              setPopup({
                show: true,
                text: "Your password has been successfully changed.",
                type: "info",
              });
              setReset(false);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setPopup({
            show: true,
            text: "Passwords does not match",
            type: "error",
          });
        }
      } else {
        setPopup({
          show: true,
          text: "Please confirm your new password",
          type: "error",
        });
      }
    } else {
      setPopup({
        show: true,
        text: "Please enter your new password",
        type: "error",
      });
    }
  };

  return (
    <div className="ForgotPassword">
      <div className="forgot-password-wrapper">
        <div className="header">
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
                d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                stroke="#1C274C"
                stroke-width="1.5"
              ></path>{" "}
              <path
                d="M12.0002 10V14M10.2678 11L13.7319 13M13.7317 11L10.2676 13"
                stroke="#1C274C"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
              <path
                d="M6.73266 10V14M5.00023 11L8.46434 13M8.4641 11L5 13"
                stroke="#1C274C"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
              <path
                d="M17.2681 10V14M15.5356 11L18.9997 13M18.9995 11L15.5354 13"
                stroke="#1C274C"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
            </g>
          </svg>
          <div className="header-title">Password Reset</div>
          <svg
            id="close"
            width={20}
            height={20}
            onClick={() => close()}
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
              <g clip-path="url(#a1a1a1clip0_429_10978)">
                {" "}
                <path
                  d="M16.9999 7.00004L6.99994 17"
                  stroke="#a1a1a1"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M7.00006 7.00003L17.0001 17"
                  stroke="#a1a1a1"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>{" "}
              <defs>
                {" "}
                <clipPath id="clip0_429_10978">
                  {" "}
                  <rect width="24" height="24" fill="white"></rect>{" "}
                </clipPath>{" "}
              </defs>{" "}
            </g>
          </svg>
        </div>
        <div className="input">
          {!enterCode && !resetPassword && (
            <FormInput
              {...inputMail}
              value={email}
              onChange={handleChangeEmail}
            />
          )}
          {enterCode && !resetPassword && (
            <FormInput
              {...inputCode}
              value={code}
              onChange={handleChangeCode}
            />
          )}
          {resetPassword && (
            <FormInput
              {...inputPassword}
              value={newPassword}
              onChange={handleChangeNewPassword}
            />
          )}
          {resetPassword && (
            <FormInput
              {...inputConfirmPassword}
              value={confirmPassword}
              onChange={handleChangeConfirmNewPassword}
            />
          )}
        </div>
        <div className="btn-container">
          {!enterCode && !resetPassword && (
            <button onClick={() => sendCode()}>Send code</button>
          )}
          {enterCode && !resetPassword && (
            <button onClick={() => checkCode()}>Check</button>
          )}
          {resetPassword && (
            <button onClick={() => resetPass()} className="reset">
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { useState, useEffect } from "react";
import "../styles/Signup.css";
import LoginSignupPhoto from "../components/LoginSignupPhoto";
import FormInput from "../components/FormInput";
import axios from "axios";
import Popup from "../components/Popup";

export default function Signup() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      type: "text",
      name: "email",
      label: "Email",
    },
    {
      id: 2,
      type: "password",
      name: "password",
      label: "Password",
    },
    {
      id: 3,
      type: "password",
      name: "confirmPassword",
      label: "Confirm Password",
    },
  ];

  const [popup, setPopup] = useState({
    show: false,
    text: "",
    type: "",
  });

  useEffect(() => {
    if (popup.show) setTimeout(() => setPopup(false), 5000);
  }, [popup.show]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  async function DB_checkUsername() {
    let retVal = false;
    await axios
      .post("http://localhost:5000/users/checkUsername", {
        username: data.username,
      })
      .then((result) => (retVal = result.data))
      .catch((error) => console.log(error));
    return retVal;
  }

  async function DB_checkEmail() {
    let retVal = false;
    await axios
      .post("http://localhost:5000/users/checkEmail", {
        email: data.email,
      })
      .then((result) => (retVal = result.data))
      .catch((error) => console.log(error));
    return retVal;
  }

  function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(data.email);
  }

  async function validateForm() {
    if (data.username === "") {
      setPopup({
        show: true,
        text: "Please enter your username.",
        type: "error",
      });
      return false;
    } else if (data.email === "") {
      setPopup({
        show: true,
        text: "Please enter your email address.",
        type: "error",
      });
      return false;
    } else if (validateEmail() === false) {
      setPopup({
        show: true,
        text: "Please enter valid email address.",
        type: "error",
      });
      return false;
    } else if (data.password === "") {
      setPopup({
        show: true,
        text: "Please enter your password.",
        type: "error",
      });
      return false;
    } else if (data.confirmPassword === "") {
      setPopup({
        show: true,
        text: "Please confirm your password.",
        type: "error",
      });
      return false;
    } else if (data.password !== data.confirmPassword) {
      setPopup({
        show: true,
        text: "The entered passwords do not match.",
        type: "error",
      });
      return false;
    }
    const existUser = await DB_checkUsername();
    if (existUser === true) {
      setPopup({
        show: true,
        text: "A user with that username already exists.",
        type: "error",
      });
      return false;
    }
    const existEmail = await DB_checkEmail();
    if (existEmail === true) {
      setPopup({
        show: true,
        text: "A user with that email already exists.",
        type: "error",
      });
      return false;
    }
    return true;
  }

  function sendMail() {
    axios
      .post("http://localhost:5000/send-mail/verify", {
        email: data.email,
        username: data.username,
      })
      .then((result) => {
        if (result.statusText === "OK") {
          setPopup({
            show: true,
            text: "Your account has been successfully created! Please check your email for a verification link to activate your account.",
            type: "info",
          });
        }
      })
      .catch((error) => console.log(error));
  }

  async function DB_createAccount() {
    await axios
      .post("http://localhost:5000/users/signup", data)
      .then((result) => {
        if (result.statusText === "OK") {
          sendMail();
        }
      })
      .catch((error) => console.log(error));
  }

  function restartForm() {
    setData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  async function handleSubmit() {
    const validationPass = await validateForm();
    if (validationPass) {
      DB_createAccount();
      restartForm();
    }
  }

  return (
    <div className="Signup">
      {popup.show === true && <Popup {...popup} close={setPopup} />}
      <div className="wrapper">
        <div className="form">
          <h1>Welcome to SocialSphere</h1>
          <p>Create Your Account and Start Exploring!</p>
          {inputs.map((input) => (
            <div className="input" key={input.id}>
              <FormInput
                {...input}
                value={data[input.name]}
                onChange={handleChange}
              />
            </div>
          ))}
          <button id="btn-signup" onClick={() => handleSubmit()}>
            Create account
          </button>
        </div>
        <div className="image-side">
          <LoginSignupPhoto isLogin={false} />
        </div>
      </div>
    </div>
  );
}

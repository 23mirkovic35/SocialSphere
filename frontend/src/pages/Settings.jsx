import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { useUserAndSocket } from "./MySphere";
import "../styles/Settings.css";
import axios from "axios";

export default function Settings() {
  const { myData, socket } = useUserAndSocket();
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorText, setUsernameErrorText] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState("");

  const [deleteWarning, setDeleteWarning] = useState(false);

  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [popup, setPopup] = useState({
    show: false,
    text: "",
    type: "",
  });

  const inputUsername = {
    id: 0,
    type: "text",
    name: "username",
    label: "New Username",
  };

  const inputEmail = {
    id: 0,
    type: "text",
    name: "email",
    label: "New Email",
  };

  const inputsPassword = [
    {
      id: 0,
      type: "password",
      name: "oldPassword",
      label: "Old Password",
    },
    {
      id: 1,
      type: "password",
      name: "newPassword",
      label: "New Password",
    },
    {
      id: 2,
      type: "password",
      name: "confirmNewPassword",
      label: "Confirm New Pasword",
    },
  ];

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  async function DB_checkUsername() {
    let retVal = false;
    await axios
      .post("http://localhost:5000/users/checkUsername", {
        username: newUsername,
      })
      .then((result) => (retVal = result.data))
      .catch((error) => console.log(error));
    return retVal;
  }

  const changePassword = async () => {
    if (data.oldPassword !== "" && data.oldPassword === myData.password) {
      if (data.newPassword !== "") {
        if (data.confirmNewPassword !== "") {
          if (data.newPassword === data.confirmNewPassword) {
            await axios
              .post("http://localhost:5000/users/updatePassword", {
                username: myData.username,
                newPassword: data.newPassword,
              })
              .then(() => {
                logout();
              })
              .catch((error) => console.log(error));
          } else {
            setPasswordErrorText("Passwords does not match");
            setPasswordError(true);
          }
        } else {
          setPasswordErrorText("Please confirm your new password");
          setPasswordError(true);
        }
      } else {
        setPasswordErrorText("Please enter your new password");
        setPasswordError(true);
      }
    } else {
      setPasswordErrorText("Please enter your old password");
      setPasswordError(true);
    }
  };

  function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(newEmail);
  }

  async function DB_checkEmail() {
    let retVal = false;
    await axios
      .post("http://localhost:5000/users/checkEmail", {
        email: newEmail,
      })
      .then((result) => (retVal = result.data))
      .catch((error) => console.log(error));
    return retVal;
  }

  const changeEmail = async () => {
    if (newEmail !== "") {
      if (validateEmail()) {
        if (!(await DB_checkEmail())) {
          await axios
            .post("http://localhost:5000/users/updateEmail", {
              username: myData.username,
              newEmail: newEmail,
            })
            .then((result) => {
              logout();
            })
            .catch((error) => console.log(error));
        } else {
          setEmailErrorText("A user with that email already exists");
          setEmailError(true);
        }
      } else {
        setEmailErrorText("Please enter valid email");
        setEmailError(true);
      }
    } else {
      setEmailErrorText("Please enter your email");
      setEmailError(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = `http://localhost:3000/login`;
  };

  const changeUsername = async () => {
    if (newUsername !== "") {
      const usernameInDB = await DB_checkUsername();
      if (!usernameInDB) {
        await axios
          .post("http://localhost:5000/users/updateUsername", {
            username: myData.username,
            newUsername: newUsername,
          })
          .then((result) => {
            logout();
          })
          .catch((error) => console.log(error));
      } else {
        setUsernameErrorText("A user with that email already exists");
        setUsernameError(true);
      }
    } else {
      setUsernameErrorText("Please enter your new username");
      setUsernameError(true);
    }
  };

  const deleteAccount = () => {
    axios
      .post("http://localhost:5000/users/deleteAccount", {
        username: myData.username,
      })
      .then(() => {
        logout();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="Settings">
      <div className="wrapper">
        <div className="change">
          <div className="title">Change Username</div>
          <div className="input">
            <FormInput
              {...inputUsername}
              value={data[inputUsername.name]}
              onChange={handleUsernameChange}
            />
          </div>
        </div>
        {usernameError && <span className="error">{usernameErrorText}</span>}
        <div className="save-changes">
          <button
            onClick={() => {
              changeUsername();
            }}
          >
            Save username
          </button>
        </div>{" "}
        <div className="change">
          <div className="title">Change Email</div>
          <div className="input">
            <FormInput
              {...inputEmail}
              value={data[inputEmail.name]}
              onChange={handleEmailChange}
            />
          </div>
        </div>
        {emailError && <span className="error">{emailErrorText}</span>}
        <div className="save-changes">
          <button
            onClick={() => {
              changeEmail();
            }}
          >
            Save email
          </button>
        </div>
        <div className="change">
          <div className="title">Change Password</div>
          <div className="content">
            {inputsPassword.map((input) => (
              <div className="input" key={input.id}>
                <FormInput
                  {...input}
                  value={data[input.name]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>
        {passwordError && <span className="error">{passwordErrorText}</span>}
        <div className="save-changes">
          <button
            onClick={() => {
              changePassword();
            }}
          >
            Save password
          </button>
        </div>
        <span className="horizontal-line"></span>
        <div className="delete-account">
          <button
            onClick={() => {
              setDeleteWarning(true);
            }}
          >
            Delete account
          </button>
        </div>
      </div>
      {deleteWarning && (
        <div className="delete-warning">
          <div className="delete-wrapper">
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
                    d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V8C11.25 7.58579 11.5858 7.25 12 7.25Z"
                    fill="#1C274C"
                  ></path>{" "}
                  <path
                    d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                    fill="#1C274C"
                  ></path>{" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.2944 4.47643C9.36631 3.11493 10.5018 2.25 12 2.25C13.4981 2.25 14.6336 3.11493 15.7056 4.47643C16.7598 5.81544 17.8769 7.79622 19.3063 10.3305L19.7418 11.1027C20.9234 13.1976 21.8566 14.8523 22.3468 16.1804C22.8478 17.5376 22.9668 18.7699 22.209 19.8569C21.4736 20.9118 20.2466 21.3434 18.6991 21.5471C17.1576 21.75 15.0845 21.75 12.4248 21.75H11.5752C8.91552 21.75 6.84239 21.75 5.30082 21.5471C3.75331 21.3434 2.52637 20.9118 1.79099 19.8569C1.03318 18.7699 1.15218 17.5376 1.65314 16.1804C2.14334 14.8523 3.07658 13.1977 4.25818 11.1027L4.69361 10.3307C6.123 7.79629 7.24019 5.81547 8.2944 4.47643ZM9.47297 5.40432C8.49896 6.64148 7.43704 8.51988 5.96495 11.1299L5.60129 11.7747C4.37507 13.9488 3.50368 15.4986 3.06034 16.6998C2.6227 17.8855 2.68338 18.5141 3.02148 18.9991C3.38202 19.5163 4.05873 19.8706 5.49659 20.0599C6.92858 20.2484 8.9026 20.25 11.6363 20.25H12.3636C15.0974 20.25 17.0714 20.2484 18.5034 20.0599C19.9412 19.8706 20.6179 19.5163 20.9785 18.9991C21.3166 18.5141 21.3773 17.8855 20.9396 16.6998C20.4963 15.4986 19.6249 13.9488 18.3987 11.7747L18.035 11.1299C16.5629 8.51987 15.501 6.64148 14.527 5.40431C13.562 4.17865 12.8126 3.75 12 3.75C11.1874 3.75 10.4379 4.17865 9.47297 5.40432Z"
                    fill="#1C274C"
                  ></path>{" "}
                </g>
              </svg>
              <div className="header-text">Warning</div>
            </div>
            <span className="horizontal-line"></span>
            <div className="content-text">
              Deleting your account will permanently remove all your data and
              cannot be undone. Are you sure you want to proceed with this
              action?
            </div>
            <div className="btn-container">
              <button onClick={() => deleteAccount()}>Yes</button>
              <button onClick={() => setDeleteWarning(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React from "react";
import Logo from "./Logo";
import "../styles/LoginSignupPhoto.css";

export default function BelgradePhoto(props) {
  return (
    <div className="belgradePhoto">
      {props.isLogin === true && (
        <img
          src="../assets/Computer login-amico.png"
          height={350}
          width={350}
        />
      )}
      {props.isLogin !== true && (
        <img src="../assets/signup.png" height={350} width={350} />
      )}
      <div className="logo-container">
        <Logo isHome={true} />
      </div>
    </div>
  );
}

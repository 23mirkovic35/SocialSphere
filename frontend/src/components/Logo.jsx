import React from "react";
import "../styles/Logo.css";

export default function Logo(props) {
  return (
    <div className="Logo">
      {props.isHome === true && (
        <img
          src="https://firebasestorage.googleapis.com/v0/b/socialsphere-2023.appspot.com/o/logo-white.png?alt=media&token=8f7a6712-9080-4057-97bb-33aa18453197"
          alt="Logo Kompanije"
        />
      )}
      {props.isHome === false && (
        <img
          src="https://firebasestorage.googleapis.com/v0/b/socialsphere-2023.appspot.com/o/logo.png?alt=media&token=238a8e7f-1525-4168-95c3-88a2c1fbca98"
          alt="Logo Kompanije"
        />
      )}
      <div className="textContainer">
        {props.isHome === true && (
          <div className="name white">SocialSphere</div>
        )}
        {props.isHome === false && (
          <div className="name blue">SocialSphere</div>
        )}
        {props.isHome === true && (
          <div className="slogan white">
            Connecting People, Expanding Horizons
          </div>
        )}
        {props.isHome === false && (
          <div className="slogan blue">
            Connecting People, Expanding Horizons
          </div>
        )}
      </div>
    </div>
  );
}

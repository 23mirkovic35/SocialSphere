import React from "react";
import "../styles/Logo.css";

export default function Logo(props) {
  return (
    <div className="Logo">
      {props.isHome === true && (
        <img src="../assets/logo-white.png" alt="Logo Kompanije" />
      )}
      {props.isHome === false && (
        <img src="../assets/logo.png" alt="Logo Kompanije" />
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

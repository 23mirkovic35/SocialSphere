import React from "react";
import "../styles/Popup.css";
import { FaXmark, FaCircleExclamation, FaCircleCheck } from "react-icons/fa6";

function Popup(props) {
  const { show, type, text, username, profilePicture } = props;
  setTimeout(() => {
    if (show === true) props.close(false);
  }, 5000);
  return show ? (
    <div className="Popup">
      {type === "error" && (
        <div className="popup-wrapper error">
          <div className="icon error">
            <FaCircleExclamation size="20" color="#a70000" />
          </div>
          <div className="text">{text}</div>
          <button className="close-btn" onClick={() => props.close(false)}>
            <FaXmark size="20" color="grey" />
          </button>
        </div>
      )}
      {type === "info" && (
        <div className="popup-wrapper info">
          <div className="icon error">
            <FaCircleCheck size="25" color="#3F704D" />
          </div>
          <div className="text">{text}</div>
          <button className="close-btn" onClick={() => props.close(false)}>
            <FaXmark size="20" color="grey" />
          </button>
        </div>
      )}
      {type === "request" && (
        <div className="popup-wrapper request">
          <img src={profilePicture} alt="" />
          <div className="text">
            {username}
            {text}
          </div>
          <button className="close-btn" onClick={() => props.close(false)}>
            <FaXmark size="20" color="grey" />
          </button>
        </div>
      )}
    </div>
  ) : (
    ""
  );
}

export default Popup;

import React from "react";
import "../styles/MessageNotifications.css";

export default function MessageNotifications() {
  return (
    <div className="MessageNotifications">
      <input type="checkbox" name="cb_msgBox" id="cb_msgBox" />
      <label htmlFor="cb_msgBox">
        <svg
          id="svg_messageBox"
          width={20}
          height={20}
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
              d="M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z"
              stroke="#FFFFFF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </label>
      <div className="messages-box">
        <div className="title">
          <div className="text">Message</div>
          <div className="other">
            <span className="unread-msg"></span>
            <div className="number">14 unread messages</div>
          </div>
        </div>
        <div className="messages">
          <div className="message-box unread">
            <img src="../assets/milica.png" alt="" id="friend-img" />
            <div className="message">
              <div className="from">Milica Golubovic</div>
              <div className="text">
                Ej Gru ti si da mi se potpises na sisi moras da priznas
              </div>
            </div>
          </div>
          <div className="message-box">
            <img src="../assets/milica.png" alt="" id="friend-img" />
            <div className="message">
              <div className="from">Milica Golubovic</div>
              <div className="text">
                Ej Gru ti si da mi se potpises na sisi moras da priznas
              </div>
            </div>
          </div>
          <div className="message-box">
            <img src="../assets/milica.png" alt="" id="friend-img" />
            <div className="message">
              <div className="from">Milica Golubovic</div>
              <div className="text">
                Ej Gru ti si da mi se potpises na sisi moras da priznas
              </div>
            </div>
          </div>
          <div className="message-box unread">
            <img src="../assets/milica.png" alt="" id="friend-img" />
            <div className="message">
              <div className="from">Milica Golubovic</div>
              <div className="text">
                Ej Mire ti si da mi se potpises na sisi moras da priznas
              </div>
            </div>
          </div>
          <div className="message-box">
            <img src="../assets/milica.png" alt="" id="friend-img" />
            <div className="message">
              <div className="from">Milica Golubovic</div>
              <div className="text">
                Ej Gru ti si da mi se potpises na sisi moras da priznas
              </div>
            </div>
          </div>
        </div>
        <div className="show-all">Show All</div>
      </div>
      <span className="red-dot"></span>
    </div>
  );
}

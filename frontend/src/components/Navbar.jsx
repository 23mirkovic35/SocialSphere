import React, { useState } from "react";
import "../styles/Navbar.css";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { FaRightToBracket, FaPlus } from "react-icons/fa6";

export default function Navbar(props) {
  const scrollToElement = (event, elementId) => {
    event.preventDefault();
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="Navbar">
      <div className="navbar-header">
        <Link className="link" to="/login">
          <FaRightToBracket />
          <div className="text">Log In</div>
        </Link>
        <Link className="link" to="/signup">
          <FaPlus />
          <div className="text">Sign up</div>
        </Link>
      </div>
      <div className="navbar-content">
        <Logo isHome={props.isHome} />
        <ul>
          <li>
            <a href="#hero" onClick={(e) => scrollToElement(e, "hero")}>
              {" "}
              Home{" "}
            </a>
          </li>
          <li>
            <a href="#about" onClick={(e) => scrollToElement(e, "about")}>
              About us
            </a>
          </li>
          <li>
            <a href="#about" onClick={(e) => scrollToElement(e, "reviews")}>
              Reviews
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => scrollToElement(e, "contact")}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

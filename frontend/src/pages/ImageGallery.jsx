import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ImageGallery.css";

export default function ImageGallery() {
  const { username } = useParams();
  const [images, setImages] = useState([]);

  useEffect(() => {
    getUserImages(username);
  }, [username]);

  async function getUserImages(username) {
    const data = { username: username };
    const response = await axios.post(
      "http://localhost:5000/posts/getUserImages",
      data
    );
    setImages(response.data);
  }

  return (
    <div className="ImageGallery">
      {images.map((image) => (
        <div className="pictures">
          <img src={image} style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
}

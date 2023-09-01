import React from "react";
import "../styles/Feed.css";
import { useUserAndSocket } from "./MySphere";

function Feed() {
  const { myData, socket } = useUserAndSocket();
  return <div className="Feed">{myData.name}</div>;
}

export default Feed;

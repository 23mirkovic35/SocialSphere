import React, { useEffect, useRef } from "react";
import "../styles/CallRoom.css";
export default function VideoPlayer({ user }) {
  const ref = useRef();

  useEffect(() => {
    user?.videoTrack.play(ref.current);
  }, []);

  return (
    <div>
      <div ref={ref} className="video"></div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

function Waveform({ audioUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    // Initialize WaveSurfer
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "violet",
      progressColor: "purple",
      cursorWidth: 1,
    });

    // Load the audio using the provided audioUrl
    wavesurfer.current.load(audioUrl);

    // Cleanup when the component unmounts
    return () => {
      wavesurfer.current.destroy();
    };
  }, [audioUrl]);

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    isPlaying ? wavesurfer.current.pause() : wavesurfer.current.play();
  };

  return (
    <div>
      <div ref={waveformRef}></div>
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
}

export default Waveform;

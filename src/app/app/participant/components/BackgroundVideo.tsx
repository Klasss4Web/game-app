import { getLocalStorageString } from "@/utils/localStorage";
import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type BackgroundVideoProps = {
  position: String;
};

const BackgroundVideo = ({ position }: BackgroundVideoProps) => {
  const savedStatus = getLocalStorageString("game-status");

  const [muted, setMuted] = useState(false);
  useEffect(() => {
    const audioElement = new Audio("/audio/cheers.wav");

    if (!muted) {
      audioElement.play();
      audioElement.loop = true;
    } else {
      audioElement.pause();
    }
    return () => {
      audioElement.pause();
    };
  }, [muted]);

  const toggleMuted = () => {
    setMuted(!muted);
  };

  return (
    <Box className="video-container">
      <video autoPlay loop muted>
        <source
          src={
            position === "finish"
              ? "/videos/game-ended.webm"
              : "/videos/cup-winner.webm"
          }
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <button onClick={toggleMuted}>{muted ? "Unmute" : "Mute"}</button>
      {/* <div className="content">
        <h1>Welcome to My Website</h1>
        <p>This is some content overlaid on the video background.</p>
      </div> */}
    </Box>
  );
};

export default BackgroundVideo;

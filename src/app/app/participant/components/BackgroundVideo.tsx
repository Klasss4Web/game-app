import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type BackgroundVideoProps = {
  position: String;
  url: string;
};

const BackgroundVideo = ({ position, url }: BackgroundVideoProps) => {

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
      // audioElement.remove();
    };
  }, [muted, position, url]);

  const toggleMuted = () => {
    setMuted(!muted);
  };

  return (
    <Box className="video-container">
      {/* {position === "show_final_rank" ? ( */}
      <video autoPlay loop muted>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button onClick={toggleMuted}>
        {muted ? "Cheer the winner" : "Stop Cheering"}
      </button>
      {/* <div className="content">
        <h1>Welcome to My Website</h1>
        <p>This is some content overlaid on the video background.</p>
      </div> */}
    </Box>
  );
};

export default BackgroundVideo;

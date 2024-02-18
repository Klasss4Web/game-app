import { Box } from "@chakra-ui/react";
import React from "react";

const BackgroundVideo = () => {
  return (
    <Box className="video-container">
      <video autoPlay loop muted>
        <source
          src="/videos/cup-winner.webm"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      {/* <div className="content">
        <h1>Welcome to My Website</h1>
        <p>This is some content overlaid on the video background.</p>
      </div> */}
    </Box>
  );
};

export default BackgroundVideo;

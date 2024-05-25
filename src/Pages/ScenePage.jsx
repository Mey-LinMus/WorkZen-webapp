// ScenePage.js

import React, { useEffect, useState } from "react";
import Player from "../Components/Music/Player";

const ScenePage = () => {
  const [selectedVisual, setSelectedVisual] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const spotifyAccessToken = localStorage.getItem("spotifyAccessToken"); // Retrieve access token

  useEffect(() => {
    // Retrieve selected visual from local storage
    const visual = JSON.parse(localStorage.getItem("selectedVisual"));
    setSelectedVisual(visual);

    // Retrieve selected track from local storage
    const track = JSON.parse(localStorage.getItem("selectedTrack"));
    setSelectedTrack(track);
  }, []);

  return (
    <div>
      {selectedVisual && (
        <div>
          <video
            className="video-preview"
            src={selectedVisual.video}
            type="video/mp4"
            autoPlay
            loop
            muted
          >
            Your browser does not support the video tag.
          </video>
          <p>{selectedVisual.title}</p>
        </div>
      )}
      {selectedTrack && (
        <div>
          <img src={selectedTrack.albumUrl} alt={selectedTrack.title} />
          <p>{selectedTrack.title}</p>
          <p>{selectedTrack.artist}</p>
        </div>
      )}
      {spotifyAccessToken && selectedTrack && (
        <div>
          <Player
            accessToken={spotifyAccessToken}
            trackUri={selectedTrack.uri}
          />
        </div>
      )}
    </div>
  );
};

export default ScenePage;

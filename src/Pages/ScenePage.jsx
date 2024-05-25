import React, { useEffect, useState } from "react";
import Player from "../Components/Music/Player";

const ScenePage = () => {
  const [selectedVisual, setSelectedVisual] = useState(null);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const spotifyAccessToken = localStorage.getItem("spotifyAccessToken"); // Retrieve access token

  useEffect(() => {
    // Retrieve selected visual from local storage
    const visual = JSON.parse(localStorage.getItem("selectedVisual"));
    setSelectedVisual(visual);

    // Retrieve selected tracks from local storage
    const tracks = JSON.parse(localStorage.getItem("selectedTracks"));
    setSelectedTracks(tracks);
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
        </div>
      )}
      {selectedTracks.length > 0 && (
        <div>
          {selectedTracks.map((track) => (
            <div key={track.uri}>
              <img src={track.albumUrl} alt={track.title} />
              <p>{track.title}</p>
              <p>{track.artist}</p>
            </div>
          ))}
        </div>
      )}
      {spotifyAccessToken && selectedTracks.length > 0 && (
        <div>
          <Player
            accessToken={spotifyAccessToken}
            trackUri={selectedTracks[0].uri} // Start playing the first track
          />
        </div>
      )}
    </div>
  );
};

export default ScenePage;

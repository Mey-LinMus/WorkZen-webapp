import React, { useEffect, useState } from "react";
import Player from "../Components/Music/Player";
import { Container } from "react-bootstrap";

const ScenePage = () => {
  const [selectedVisual, setSelectedVisual] = useState(null);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const spotifyAccessToken = localStorage.getItem("spotifyAccessToken");

  useEffect(() => {
    const visual = JSON.parse(localStorage.getItem("selectedVisual"));
    setSelectedVisual(visual);

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
          <Container>
            <div>
              <img
                src={selectedTracks[0].albumUrl}
                alt={selectedTracks[0].title}
              />
              <p>{selectedTracks[0].title}</p>
              <p>{selectedTracks[0].artist}</p>
            </div>
          </Container>
        </div>
      )}
      {spotifyAccessToken && selectedTracks.length > 0 && (
        <div>
          <Player
            accessToken={spotifyAccessToken}
            trackUris={selectedTracks.map((track) => track.uri)}
          />
        </div>
      )}
    </div>
  );
};

export default ScenePage;

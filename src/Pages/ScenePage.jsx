import React, { useEffect, useState } from "react";
import Player from "../Components/Music/Player";
import { Button, Container } from "react-bootstrap";

const ScenePage = () => {
  const [selectedVisual, setSelectedVisual] = useState(null);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const spotifyAccessToken = localStorage.getItem("spotifyAccessToken");

  useEffect(() => {
    const visual = JSON.parse(localStorage.getItem("selectedVisual"));
    setSelectedVisual(visual);

    const tracks = JSON.parse(localStorage.getItem("selectedTracks"));
    setSelectedTracks(tracks);
  }, []);

  const handlePrevious = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : selectedTracks.length - 1
    );
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex < selectedTracks.length - 1 ? prevIndex + 1 : 0
    );
  };

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
                src={selectedTracks[currentTrackIndex].albumUrl}
                alt={selectedTracks[currentTrackIndex].title}
              />
              <p>{selectedTracks[currentTrackIndex].title}</p>
              <p>{selectedTracks[currentTrackIndex].artist}</p>
            </div>
            <Button onClick={handlePrevious}>Previous</Button>
            <Button onClick={handleNext}>Next</Button>
          </Container>
        </div>
      )}
      {spotifyAccessToken && selectedTracks.length > 0 && (
        <div>
          <Player
            accessToken={spotifyAccessToken}
            trackUri={selectedTracks[currentTrackIndex].uri}
          />
        </div>
      )}
    </div>
  );
};

export default ScenePage;

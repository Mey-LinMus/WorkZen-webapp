import React, { useEffect, useState, Suspense} from "react";
import Player from "../Components/Music/Player";
import { Container } from "react-bootstrap";
import "../Styles/scenePage.css"; 

const ScenePage = () => {
  const [selectedVisual, setSelectedVisual] = useState(null);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [VisualComponent, setVisualComponent] = useState(null);
  const spotifyAccessToken = localStorage.getItem("spotifyAccessToken");

  useEffect(() => {
    const visual = JSON.parse(localStorage.getItem("selectedVisual"));
    setSelectedVisual(visual);

    const tracks = JSON.parse(localStorage.getItem("selectedTracks"));
    setSelectedTracks(tracks);

    if (visual) {
      import(`../Components/Visuals/${visual.component}.jsx`)
        .then((module) => {
          setVisualComponent(() => module.default);
        })
        .catch((error) => {
          console.error("Error loading visual component", error);
        });
    }
  }, []);

  return (
    <div className="ScenePage">
      {VisualComponent && (
        <Suspense fallback={<div>Loading...</div>}>
          <VisualComponent />
        </Suspense>
      )}

      {spotifyAccessToken && selectedTracks.length > 0 && (
        <Container fluid>
          <Player
            accessToken={spotifyAccessToken}
            trackUris={selectedTracks.map((track) => track.uri)}
          />
        </Container>
      )}
    </div>
  );
};

export default ScenePage;

import React, { useEffect, useState, Suspense } from "react";
import Player from "../Components/Music/Player";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ScenePage = () => {
  const [selectedVisual, setSelectedVisual] = useState(null);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [VisualComponent, setVisualComponent] = useState(null);
  const spotifyAccessToken = localStorage.getItem("spotifyAccessToken");
  const navigate = useNavigate();

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

  const handleFavoritesClick = () => {
    navigate("/favorites");
  };

  const getDeviceId = () => {
    // Implement a function to get a unique device ID
    // For example, you could use the browser's localStorage or generate a random ID
    return localStorage.getItem("deviceId") || generateRandomId();
  };

  const generateRandomId = () => {
    // Generate a random ID and store it in localStorage
    const randomId = Math.random().toString(36).substring(2, 15);
    localStorage.setItem("deviceId", randomId);
    return randomId;
  };

  const handleSaveCombination = async () => {
    const deviceId = getDeviceId();
    const favorite = {
      visual: selectedVisual,
      tracks: selectedTracks,
    };

    try {
      const response = await fetch(
        `https://backend-favorites.onrender.com/favorites/${deviceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favorite }),
        }
      );

      if (response.ok) {
        console.log("Combination saved successfully");
      } else {
        console.error("Error saving combination");
      }
    } catch (error) {
      console.error("Error saving combination", error);
    }
  };

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

      <button onClick={handleSaveCombination}>Save Combination</button>

      <button onClick={handleFavoritesClick}>Favorieten</button>
    </div>
  );
};

export default ScenePage;

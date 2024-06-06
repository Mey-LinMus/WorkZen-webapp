import React, { useEffect, useState, Suspense } from "react";
import Player from "../Components/Music/Player";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Components/Navigation/NavigationBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { HiOutlineSave } from "react-icons/hi";

const ScenePage = () => {
  const [selectedVisual, setSelectedVisual] = useState(null);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [VisualComponent, setVisualComponent] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
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
    return localStorage.getItem("deviceId") || generateRandomId();
  };

  const generateRandomId = () => {
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

  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    document.body.style.overflow = "hidden"; // Disable vertical scrolling
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    document.body.style.overflow = "auto"; // Enable vertical scrolling
    setIsFullscreen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        exitFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        document.body.style.overflow = "auto"; // Enable vertical scrolling
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div className="ScenePage" style={{ overflowX: "hidden" }}>
      {!isFullscreen && (
        <div>
          <NavigationBar />
        </div>
      )}
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

      {!isFullscreen && (
        <div className="absolute top-4 right-2 flex mr-24 space-x-4 ">
          <button
            className="text-xl mr-2 bg-secondaryColor text-neutralColor p-1 rounded-lg"
            onClick={enterFullscreen}
          >
            <FontAwesomeIcon icon={faExpand} />
          </button>
          <button
            className="text-2xl bg-secondaryColor text-neutralColor rounded-lg p-1"
            onClick={handleSaveCombination}
          >
            <HiOutlineSave />
          </button>
        </div>
      )}
    </div>
  );
};

export default ScenePage;

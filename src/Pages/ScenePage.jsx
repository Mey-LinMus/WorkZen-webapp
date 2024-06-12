import React, { useEffect, useState, useRef, Suspense } from "react";
import Player from "../Components/Music/Player";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Components/Navigation/NavigationBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { HiOutlineSave } from "react-icons/hi";
import VisualChangeModal from "../Components/Modals/VisualChange";
import SaveCombinationModal from "../Components/Modals/SaveCombination";
import VisualComponentLoader from "../Components/SceneComponents/VisualLoader";
import FavoriteDisplay from "../Components/SceneComponents/FavoriteDisplay";

const ScenePage = () => {
  const [selectedVisual, setSelectedVisual] = useState(null);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [VisualComponent, setVisualComponent] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const spotifyAccessToken = localStorage.getItem("spotifyAccessToken");
  const [lastClickedFavorite, setLastClickedFavorite] = useState(null);
  const fullscreenRef = useRef(null);

  useEffect(() => {
    const visual = JSON.parse(localStorage.getItem("selectedVisual"));
    setSelectedVisual(visual);

    const tracks = JSON.parse(localStorage.getItem("selectedTracks"));
    setSelectedTracks(tracks);

    const clickedFavorite = JSON.parse(localStorage.getItem("Favorite"));

    if (clickedFavorite) {
      import(
        `../Components/Visuals/${clickedFavorite.favorite.visual.component}.jsx`
      )
        .then((module) => {
          setVisualComponent(() => module.default);
        })
        .catch((error) => {
          console.error("Error loading visual component", error);
        });
    } else {
      if (visual) {
        import(`../Components/Visuals/${visual.component}.jsx`)
          .then((module) => {
            setVisualComponent(() => module.default);
          })
          .catch((error) => {
            console.error("Error loading visual component", error);
          });
      }
    }
  }, []);

  const getDeviceId = () => {
    return localStorage.getItem("deviceId") || generateRandomId();
  };

  const generateRandomId = () => {
    const randomId = Math.random().toString(36).substring(2, 15);
    localStorage.setItem("deviceId", randomId);
    return randomId;
  };

  const handleSaveCombination = async (name) => {
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
          body: JSON.stringify({ favorite, name }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Combination saved successfully");
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        console.error("Error saving combination");
      }
    } catch (error) {
      console.error("Error saving combination", error);
    }
    setIsSaveModalOpen(false);
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
    document.body.style.overflow = "hidden";
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    const elem = document;
    const exitFullscreen =
      elem.exitFullscreen ||
      elem.mozCancelFullScreen ||
      elem.webkitExitFullscreen ||
      elem.msExitFullscreen;

    if (exitFullscreen) {
      exitFullscreen.call(elem);
    } else if (document.webkitIsFullScreen) {
      document.webkitExitFullscreen();
    }

    document.body.style.overflow = "auto";
    setIsFullscreen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isFullscreen) {
        const scrollY = window.scrollY;
        if (scrollY > 0) {
          exitFullscreen();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFullscreen]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      exitFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      document.body.style.overflow = "auto";
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
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

  const handleVisualChange = (newVisual) => {
    setSelectedVisual(newVisual);
    localStorage.setItem("selectedVisual", JSON.stringify(newVisual));
    import(`../Components/Visuals/${newVisual.component}.jsx`)
      .then((module) => {
        setVisualComponent(() => module.default);
      })
      .catch((error) => {
        console.error("Error loading visual component", error);
      });
  };

  return (
    <div
      className="ScenePage"
      style={{ overflowX: "hidden" }}
      ref={fullscreenRef}
    >
      <NavigationBar onVisualChangeClick={() => setIsModalOpen(true)} />

      <VisualComponentLoader
        selectedVisual={selectedVisual}
        onVisualComponentLoad={setVisualComponent}
      />

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
            onClick={() => setIsSaveModalOpen(true)}
          >
            <HiOutlineSave />
          </button>
        </div>
      )}

      {successMessage && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white p-4 rounded-lg">
          {successMessage}
        </div>
      )}

      {isModalOpen && (
        <VisualChangeModal
          onClose={() => setIsModalOpen(false)}
          onVisualChange={handleVisualChange}
        />
      )}

      <SaveCombinationModal
        show={isSaveModalOpen}
        handleClose={() => setIsSaveModalOpen(false)}
        handleSave={handleSaveCombination}
      />

      {lastClickedFavorite && (
        <FavoriteDisplay lastClickedFavorite={lastClickedFavorite} />
      )}
    </div>
  );
};

export default ScenePage;

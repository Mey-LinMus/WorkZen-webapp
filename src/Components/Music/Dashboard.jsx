import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import Typography from "../ui-elements/Typography";
import StyledButton from "../ui-elements/Button";
import { HiChevronLeft, HiChevronRight, HiArrowLeft } from "react-icons/hi2";
import TrackFetcher from "./TrackFetcher";

export default function Dashboard({ code }) {
  const { accessToken, error } = useAuth(code);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("classic");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const tracksPerPage = 18;
  const navigate = useNavigate();

  const playlistIds = {
    classic: "37i9dQZF1DWVFeEut75IAL",
    instrumenteel: "37i9dQZF1EIgrs7YFJARua",
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("spotifyAccessToken", accessToken);
    }
  }, [accessToken]);

  function toggleTrackSelection(track) {
    const isSelected = selectedTracks.some((t) => t.uri === track.uri);
    if (isSelected) {
      setSelectedTracks(selectedTracks.filter((t) => t.uri !== track.uri));
    } else {
      setSelectedTracks([...selectedTracks, track]);
    }
  }

  function navigateToScene() {
    localStorage.setItem("selectedTracks", JSON.stringify(selectedTracks));
    navigate("/scene-page");
  }

  useEffect(() => {
    const total = selectedTracks.reduce(
      (acc, track) => acc + track.duration_ms,
      0
    );
    setTotalDuration(total);
  }, [selectedTracks]);

  const startIndex = (currentPage - 1) * tracksPerPage;
  const currentTracks = playlistTracks.slice(
    startIndex,
    startIndex + tracksPerPage
  );
  const totalPages = Math.ceil(playlistTracks.length / tracksPerPage);

  return (
    <div className="p-4">
      <TrackFetcher
        accessToken={accessToken}
        playlistId={playlistIds[selectedCategory]}
        onTracksFetched={setPlaylistTracks}
      />
      <div className="p-4">
        <div className="fixed top-0 left-0 right-0 flex justify-center w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 bg-primaryColor w-full sm:w-11/12 h-auto m-2 p-4 rounded-lg shadow-lg">
            <div className="flex flex-row space-x-2">
              <StyledButton
                selected={selectedCategory === "classic"}
                onClick={() => setSelectedCategory("classic")}
                className="text-xs sm:text-sm"
              >
                Classic
              </StyledButton>
              <StyledButton
                selected={selectedCategory === "instrumenteel"}
                onClick={() => setSelectedCategory("instrumenteel")}
                className="text-xs sm:text-sm"
              >
                Instrumenteel
              </StyledButton>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <Typography variant="bodyText" className="text-xs sm:text-sm">
                {Math.floor(totalDuration / 60000)} minuten
              </Typography>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-gray-600 text-neutralColor border border-neutralColor px-2 py-1 rounded-full disabled:opacity-50 size-8"
              >
                <HiChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="bg-gray-600 size-8 text-neutralColor px-2 py-1 rounded-full disabled:opacity-50"
              >
                <HiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 sm:mt-10">
        <div className="flex justify-center sm:mb-0 mt-24  text-center lg:text-5xl">
          <Typography
            variant="h3"
            className="text-center text-xl sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Selecteer liedjes
          </Typography>
        </div>
        <div className="mt-6 overflow-x-scroll sm:overflow-x-auto">
          <div className="flex flex-wrap justify-center gap-2 align-middle">
            {currentTracks.map((track) => (
              <div
                key={track.uri}
                className={`flex items-center text-neutralColor p-1 rounded-lg ${
                  selectedTracks.find((t) => t.uri === track.uri) ? "" : ""
                }`}
                style={{ flexBasis: "calc(50% - 0.5rem)" }}
              >
                <button
                  className={`flex items-center w-full ${
                    selectedTracks.find((t) => t.uri === track.uri)
                      ? "bg-gray-800 border border-1 border-neutralColor"
                      : "bg-gray-900/50 "
                  } rounded-lg p-2`}
                  onClick={() => toggleTrackSelection(track)}
                >
                  <img
                    src={track.albumUrl}
                    alt={track.title}
                    className="w-8 h-8 rounded-lg object-cover mr-2 sm:w-12 sm:h-12 sm:mr-4"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-semibold">
                      {track.title}
                    </span>{" "}
                    <span className="text-xs sm:text-sm text-gray-400">
                      {track.artist}
                    </span>
                  </div>
                </button>
              </div>
            ))}
            {currentTracks.length === 0 && (
              <div className="text-center text-gray-400">
                No tracks available
              </div>
            )}
          </div>
        </div>
        <div className="mt-6">
          <div className="mb-6 mt-12 text-center ">
            <Typography variant="h3" className="text-sm sm:text-base">
              Geselecteerde liedjes:
            </Typography>
          </div>
          <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-3 grid-rows-2 gap-2">
            {selectedTracks.map((track) => (
              <li
                key={track.uri}
                className="flex items-center bg-gray-800 text-neutralColor p-2 rounded-lg"
              >
                <button
                  className="flex items-center w-full"
                  onClick={() => toggleTrackSelection(track)}
                >
                  <img
                    src={track.albumUrl}
                    alt={track.title}
                    className="w-8 h-8 rounded-lg object-cover mr-2 sm:w-12 sm:h-12 sm:mr-4"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-semibold">
                      {track.title}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400">
                      {track.artist}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-28 px-4 py-2 flex space-x-28 items-center md:justify-center md:mr-48">
          <div className="mr-4 md:mr-28">
            <StyledButton onClick={() => navigate(-1)}>
              <HiArrowLeft />
            </StyledButton>
          </div>
          <StyledButton
            onClick={navigateToScene}
            disabled={selectedTracks.length === 0}
          >
            Start
          </StyledButton>
        </div>
      </div>
    </div>
  );
}

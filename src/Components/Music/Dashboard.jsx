import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import Typography from "../ui-elements/Typography";
import StyledButton from "../ui-elements/Button";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const spotifyApi = new SpotifyWebApi({
  clientId: "1f4f7e164fe945998e2b5904bd676792",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("classic");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDuration, setTotalDuration] = useState(0);
  const tracksPerPage = 18;
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("spotifyAccessToken", accessToken);
    }
  }, [accessToken]);

  const playlistIds = {
    classic: "3YeJcIqzSIH1sy1molDRre",
    jazz: "2y5zb6o0SFrQXNGq5DPDy5",
  };

  const toggleTrackSelection = (track) => {
    const isSelected = selectedTracks.some((t) => t.uri === track.uri);
    if (isSelected) {
      setSelectedTracks(selectedTracks.filter((t) => t.uri !== track.uri));
    } else {
      setSelectedTracks([...selectedTracks, track]);
    }
  };

  const navigateToScene = () => {
    localStorage.setItem("selectedTracks", JSON.stringify(selectedTracks));
    navigate("/scene-page");
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    console.log("Access Token set:", accessToken); // Add logging

    const fetchPlaylistTracks = async (playlistId) => {
      try {
        const response = await spotifyApi.getPlaylistTracks(playlistId);
        console.log("Playlist response:", response); // Add logging
        return response.body.items.map((item) => {
          const track = item.track;
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title:
              track.name.length > 25
                ? track.name.substring(0, 25) + "..."
                : track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
            duration_ms: track.duration_ms,
          };
        });
      } catch (error) {
        console.error("Error fetching playlist tracks:", error);
        return [];
      }
    };

    const fetchTracks = async () => {
      const playlistId = playlistIds[selectedCategory];
      const tracks = await fetchPlaylistTracks(playlistId);
      setPlaylistTracks(tracks);
      setCurrentPage(1);
    };

    fetchTracks();
  }, [accessToken, selectedCategory]);

  useEffect(() => {
    let total = 0;
    selectedTracks.forEach((track) => {
      total += track.duration_ms;
    });
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
      <div className="p-4">
        <div className="fixed top-0 left-0 right-0 flex justify-center w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 bg-primaryColor w-full sm:w-11/12 h-auto m-2 p-4 rounded-lg shadow-lg">
            <div className="flex flex-row space-x-2">
              <StyledButton
                selected={selectedCategory === "classic"}
                onClick={() => setSelectedCategory("classic")}
                className="text-xs sm:text-sm sm:text-base"
              >
                Classic
              </StyledButton>
              <StyledButton
                selected={selectedCategory === "jazz"}
                onClick={() => setSelectedCategory("jazz")}
                className="text-xs sm:text-sm sm:text-base"
              >
                Jazz
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
                className="bg-gray-600 text-neutralColor px-2 py-1 rounded-full disabled:opacity-50 size-8"
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
        <div className="flex justify-center sm:mb-0 mt-24 text-center lg:text-5xl">
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
                <img
                  src={track.albumUrl}
                  alt={track.title}
                  className="w-12 h-12"
                />
                <div className="ml-2">
                  <p>{track.title}</p>
                  <p>{track.artist}</p>
                </div>
                <button onClick={() => toggleTrackSelection(track)}>
                  {selectedTracks.find((t) => t.uri === track.uri)
                    ? "Deselect"
                    : "Select"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={navigateToScene}>Go to Scene Page</button>
    </div>
  );
}

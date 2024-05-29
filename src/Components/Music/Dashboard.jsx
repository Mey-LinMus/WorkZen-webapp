import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./useAuth";
// import { useNavigate } from "react-router-dom";
import Typography from "../ui-elements/Typography";
import UILogo from "../ui-elements/Logo";
import StyledButton from "../ui-elements/Button";
import StepNavigator from "../Selections/StepNavigator";
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
  const tracksPerPage = 18;
  // const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("spotifyAccessToken", accessToken);
    }
  }, [accessToken]);

  const playlistIds = {
    classic: "3YeJcIqzSIH1sy1molDRre",
    jazz: "2y5zb6o0SFrQXNGq5DPDy5",
  };

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
    // navigate("/scene-page");
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    const fetchPlaylistTracks = async (playlistId) => {
      try {
        const response = await spotifyApi.getPlaylistTracks(playlistId);
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

  const startIndex = (currentPage - 1) * tracksPerPage;
  const currentTracks = playlistTracks.slice(
    startIndex,
    startIndex + tracksPerPage
  );
  const totalPages = Math.ceil(playlistTracks.length / tracksPerPage);

  return (
    <div className="p-4">
      <div>
        <div className="flex justify-between items-center mb-4 bg-primaryColor w-11/12 h-90  m-2 p-4 rounded-lg shadow-lg fixed  ">
          <div className="flex space-x-4">
            <StyledButton
              variant="borderButton"
              onClick={() => setSelectedCategory("classic")}
            >
              Classic
            </StyledButton>
            <StyledButton
              variant="borderButton"
              onClick={() => setSelectedCategory("jazz")}
              className="px-4 py-2  border-solid border-neutralColor rounded-lg text-neutralColor"
            >
              Jazz
            </StyledButton>
          </div>
          <div className="flex justify-center">
            <Typography
              variant="h1"
              className="text-center flex justify-center"
            >
              Selecteer liedjes
            </Typography>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-700 text-neutralColor px-3 py-1 rounded-lg disabled:opacity-50"
            >
              <HiChevronLeft />
            </button>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-gray-700 text-neutralColor px-3 py-1 rounded-lg disabled:opacity-50 "
            >
              <HiChevronRight />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-40">
        <div className="grid grid-cols-3 grid-rows-2 gap-2">
          {currentTracks.map((track) => (
            <div
              key={track.uri}
              className={`flex items-center  text-neutralColor p-1 rounded-lg ${
                selectedTracks.find((t) => t.uri === track.uri) ? "" : ""
              }`}
            >
              <button
                className={`flex items-center w-96 ${
                  selectedTracks.find((t) => t.uri === track.uri)
                    ? "bg-gray-700"
                    : "bg-gray-900"
                } rounded-lg p-2`}
                onClick={() => toggleTrackSelection(track)}
              >
                <img
                  src={track.albumUrl}
                  alt={track.title}
                  className="w-8 h-8 rounded-lg object-cover mr-2 sm:w-12 sm:h-12 sm:mr-4"
                />
                <div className="flex flex-col">
                  <span className="text-sm sm:text-lg font-semibold">
                    {track.title}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-400">
                    {track.artist}
                  </span>
                </div>
              </button>
            </div>
          ))}
          {currentTracks.length === 0 && (
            <div className="text-center text-gray-400">No tracks available</div>
          )}
        </div>

        <div className="mt-6">
          <div className=" mb-6 mt-12">
            <Typography variant="h3">Selected liedjes:</Typography>
          </div>
          <ul className="space-y-2">
            {selectedTracks.map((track) => (
              <li
                key={track.uri}
                className="flex items-center bg-gray-800 text-neutralColor p-2 rounded-lg"
              >
                <img
                  src={track.albumUrl}
                  alt={track.title}
                  className="w-8 h-8 rounded-lg object-cover mr-2 sm:w-12 sm:h-12 sm:mr-4"
                />
                <div className="flex flex-col">
                  <span className="text-sm sm:text-lg font-semibold">
                    {track.title}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-400">
                    {track.artist}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./useAuth";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../Styles/dashboard.css";

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
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <div className="mb-2">
        <Button
          variant={
            selectedCategory === "classic" ? "primary" : "outline-primary"
          }
          onClick={() => setSelectedCategory("classic")}
          className="me-2"
        >
          Classic Songs
        </Button>
        <Button
          variant={selectedCategory === "jazz" ? "primary" : "outline-primary"}
          onClick={() => setSelectedCategory("jazz")}
        >
          Jazz Songs
        </Button>
      </div>
      <div
        className="flex-grow-1 my-2"
        style={{ overflowX: "hidden", width: "100%" }}
      >
        <div className="dashboard-track-list">
          {currentTracks.map((track) => (
            <div
              key={track.uri}
              xs={6}
              className={`dashboard-track-item ${
                selectedTracks.find((t) => t.uri === track.uri)
                  ? "selected"
                  : ""
              }`}
            >
              <button
                className={`w-100 dashboard-track-button ${
                  selectedTracks.find((t) => t.uri === track.uri)
                    ? "selected"
                    : "dark"
                }`}
                onClick={() => toggleTrackSelection(track)}
              >
                <img
                  src={track.albumUrl}
                  alt={track.title}
                  className="dashboard-track-image"
                />
                <div className="dashboard-track-info">
                  <span className="dashboard-track-title">{track.title}</span>
                  <span className="dashboard-track-artist">{track.artist}</span>
                </div>
              </button>
            </div>
          ))}
        </div>
        {currentTracks.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            No tracks available
          </div>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ←
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          →
        </Button>
      </div>
      <div className="selected-tracks-list mt-3">
        <h4>Selected Tracks</h4>
        <ul className="list-group">
          {selectedTracks.map((track) => (
            <li key={track.uri} className="list-group-item">
              <img
                src={track.albumUrl}
                alt={track.title}
                className="dashboard-track-image"
              />
              <div className="dashboard-track-info">
                <span className="dashboard-track-title">{track.title}</span>
                <span className="dashboard-track-artist">{track.artist}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Button
        onClick={navigateToScene}
        disabled={selectedTracks.length === 0}
        className="mt-3"
      >
        Next
      </Button>
    </Container>
  );
}

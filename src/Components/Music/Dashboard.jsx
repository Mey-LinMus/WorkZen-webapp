import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import Player from "./Player";
import useAuth from "./useAuth";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const spotifyApi = new SpotifyWebApi({
  clientId: "1f4f7e164fe945998e2b5904bd676792",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [selectedCategory, setSelectedCategory] = useState("classic"); 
  const navigate = useNavigate(); 

  const playlistIds = {
    classic: "3YeJcIqzSIH1sy1molDRre",
    jazz: "2y5zb6o0SFrQXNGq5DPDy5",
  };

  function chooseTrack(track) {
    setPlayingTrack(track);
    localStorage.setItem("selectedTrack", JSON.stringify(track));
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
            title: track.name,
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
    };

    fetchTracks();
  }, [accessToken, selectedCategory]); 

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
        style={{ overflowY: "auto", overflowX: "hidden" }}
      >
        <Row>
          {playlistTracks.map((track) => (
            <Col key={track.uri} xs={6} sm={4} md={3} lg={2} className="mb-3">
              <Button
                variant="outline-dark"
                className="w-100"
                onClick={() => chooseTrack(track)}
                style={{ padding: "0.5rem" }}
              >
                <img
                  src={track.albumUrl}
                  alt={track.title}
                  style={{ width: "100%", height: "auto", borderRadius: "4px" }}
                />
                <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                  {track.title}
                </div>
                <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                  {track.artist}
                </div>
              </Button>
            </Col>
          ))}
        </Row>
        {playlistTracks.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}></div>
        )}
      </div>
    </Container>
  );
}

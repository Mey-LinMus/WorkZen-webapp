import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import Player from "./Player";
import useAuth from "./useAuth";
import { Container, Row, Col, Button } from "react-bootstrap";

const spotifyApi = new SpotifyWebApi({
  clientId: "1f4f7e164fe945998e2b5904bd676792",
});

export default function Dashboard({ code }) {
  console.log("Dashboard code:", code); // Debug logging

  const accessToken = useAuth(code);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  function chooseTrack(track) {
    setPlayingTrack(track);
    setLyrics("");
  }

  useEffect(() => {
    console.log("AccessToken:", accessToken); // Debug logging
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    const playlistIds = [
      "37i9dQZF1DX4sWSpwq3LiO",
      "37i9dQZF1DWV7EzJMK2FUI",
      "37i9dQZF1DWZqd5JICZI0u",
      "37i9dQZF1DXebxttQCq0zA",
      "37i9dQZF1DWWQRwui0ExPn",
      "37i9dQZF1DWVFeEut75IAL",
    ];

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

    const fetchAllPlaylistTracks = async () => {
      const promises = playlistIds.map((playlistId) =>
        fetchPlaylistTracks(playlistId)
      );
      const allPlaylistTracks = await Promise.all(promises);
      const mergedTracks = allPlaylistTracks.flat();
      setPlaylistTracks(mergedTracks);
    };

    fetchAllPlaylistTracks();
  }, [accessToken]);

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
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
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  );
}

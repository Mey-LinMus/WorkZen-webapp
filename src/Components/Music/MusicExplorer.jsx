import React, { useEffect, useState, useRef } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { FaPlayCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/musicExplorer.css"; // Ensure you create and import this CSS file

const MusicExplorer = () => {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      fetchToken();
      isMounted.current = true;
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchTracks();
    }
  }, [token]);

  const fetchToken = async () => {
    try {
      const response = await fetch("http://localhost:8888/token");
      const data = await response.json();
      setToken(data.access_token);
      setRequestCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error fetching the token:", error);
    }
  };

  const fetchTracks = async () => {
    try {
      const playlistIds = [
        "37i9dQZF1DX4sWSpwq3LiO",
        "37i9dQZF1DWV7EzJMK2FUI",
        "37i9dQZF1DWZqd5JICZI0u",
        "37i9dQZF1DXebxttQCq0zA",
        "37i9dQZF1DWWQRwui0ExPn",
        "37i9dQZF1DWVFeEut75IAL",
      ];

      const playlistTracksRequests = playlistIds.map((playlistId) =>
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      const responses = await Promise.all(playlistTracksRequests);
      const playlistTracksData = await Promise.all(
        responses.map((response) => response.json())
      );

      const allTracks = playlistTracksData.reduce(
        (accumulator, playlistTracks) =>
          accumulator.concat(playlistTracks.items),
        []
      );

      console.log("All tracks:", allTracks);

      setTracks(allTracks);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  return (
    <Container className="App">
      <h1>Spotify Tracks</h1>
      <p>Total Requests: {requestCount}</p>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {tracks.map((track, index) => (
          <Col key={index}>
            <Card className="track-item">
              <div className="card-img-container">
                <Card.Img
                  variant="top"
                  src={track.track.album.images[0].url}
                  alt={track.track.name}
                  className="card-img"
                />
                <div className="play-button-container">
                  <FaPlayCircle
                    className="play-button"
                    size={50}
                    onClick={() => {
                      const audio = new Audio(track.track.preview_url);
                      audio.play();
                    }}
                  />
                </div>
              </div>
              <Card.Body>
                <Card.Title className="track-title">
                  {track.track.name}
                </Card.Title>
                <Card.Text className="track-artists">
                  {track.track.artists.map((artist) => artist.name).join(", ")}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MusicExplorer;

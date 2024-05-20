import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Image,
  ListGroup,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const relaxingGenres = [
  "ambient",
  "chill",
  "classical",
  "jazz",
  "piano",
  "sleep",
];

// Define keywords that typically indicate instrumental tracks
const instrumentalKeywords = [
  "instrumental",
  "piano",
  "guitar",
  "violin",
  "orchestra",
];

// Function to check if a track's name contains any instrumental keywords
const isInstrumental = (trackName) => {
  const lowerCaseTrackName = trackName.toLowerCase();
  return instrumentalKeywords.some((keyword) =>
    lowerCaseTrackName.includes(keyword)
  );
};

const MusicSelect = () => {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(relaxingGenres[0]);

  useEffect(() => {

    const fetchToken = async () => {
      try {
        const response = await fetch("http://localhost:8888/token");
        const data = await response.json();
        setToken(data.access_token);
      } catch (error) {
        console.error("Error fetching the token:", error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token && selectedGenre) {

      const fetchTracks = async () => {
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/recommendations?limit=100&seed_genres=${selectedGenre}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          console.log(data);

          const filteredTracks = data.tracks.filter(
            (track) => !isInstrumental(track.name)
          );
          setTracks(filteredTracks || []);
        } catch (error) {
          console.error("Error fetching tracks:", error);
        }
      };

      fetchTracks();

      // Fetch playlists for the selected genre
      const fetchPlaylists = async () => {
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/browse/categories/${selectedGenre}/playlists?limit=10`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          console.log(data);
          setPlaylists(data.playlists.items || []);
        } catch (error) {
          console.error("Error fetching playlists:", error);
        }
      };

      fetchPlaylists();
    }
  }, [token, selectedGenre]);

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Spotify Tracks</h1>
      <Row className="mb-4">
        <Col>
          <Form.Group>
            <Form.Label>Select Genre:</Form.Label>
            <Form.Control
              as="select"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {relaxingGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {tracks.length > 0 ? (
              tracks.map((track, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex align-items-center"
                >
                  <Image
                    src={track.album.images[0].url}
                    alt={track.album.name}
                    thumbnail
                    width={64}
                    height={64}
                    className="mr-3"
                  />
                  <div>
                    <strong>{track.name}</strong>
                    <br />
                    <small>
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </small>
                    <br />
                    {track.preview_url && (
                      <audio controls className="mt-2">
                        <source src={track.preview_url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No tracks found</ListGroup.Item>
            )}
          </ListGroup>
        </Col>
        <Col>
          <h2 className="mb-3">Playlists for {selectedGenre}</h2>
          <Row>
            {playlists.map((playlist, index) => (
              <Col key={index} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={playlist.images[0].url} />
                  <Card.Body>
                    <Card.Title>{playlist.name}</Card.Title>
                    <Card.Text>
                      {playlist.description || "No description available"}
                    </Card.Text>
                    <a
                      href={playlist.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Spotify
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MusicSelect;

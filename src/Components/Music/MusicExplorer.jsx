import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  Button,
  FormCheck,
} from "react-bootstrap";
import { SelectionContext } from "../Contexts/SelectionContext";
import "bootstrap/dist/css/bootstrap.min.css";
import TrackItem from "./TrackItem";
import PlaylistCard from "./PlaylistCard";
import { useNavigate } from "react-router-dom";

const relaxingGenres = [
  "ambient",
  "chill",
  "classical",
  "jazz",
  "piano",
  "sleep",
];

const MusicExplorer = () => {
  const {
    selectedMusic,
    setSelectedMusic,
    selectedPlaylist,
    setSelectedPlaylist,
  } = useContext(SelectionContext);
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(relaxingGenres[0]);
  const [requestCount, setRequestCount] = useState(0); // Monitor request count
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("http://localhost:5000/token");
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
      const MAX_RETRY_ATTEMPTS = 3;
      const MAX_REQUESTS_PER_INTERVAL = 5; // Limit requests to 5 per interval
      const INTERVAL_DURATION = 10000; // 10 seconds

      const fetchTracks = async (retryCount = 0) => {
        try {
          if (requestCount >= MAX_REQUESTS_PER_INTERVAL) {
            console.log("Rate limit reached. Throttling requests...");
            return;
          }

          setRequestCount((prevCount) => prevCount + 1);

          const response = await fetch(
            `https://api.spotify.com/v1/recommendations?limit=100&seed_genres=${selectedGenre}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();

          const filteredTracks = data.tracks.filter(
            (track) => !isInstrumental(track.name)
          );
          setTracks(filteredTracks || []);
        } catch (error) {
          if (
            error instanceof SyntaxError &&
            error.message.includes("Unexpected token")
          ) {
            if (retryCount < MAX_RETRY_ATTEMPTS) {
              // Retry with exponential backoff
              const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff delay
              setTimeout(() => fetchTracks(retryCount + 1), delay);
            } else {
              console.error(
                "Max retry attempts reached. Unable to fetch tracks."
              );
            }
          } else {
            console.error("Error fetching tracks:", error);
          }
        }
      };

      fetchTracks();

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
          setPlaylists(data.playlists.items || []);
        } catch (error) {
          console.error("Error fetching playlists:", error);
        }
      };

      fetchPlaylists();

      const interval = setInterval(() => {
        setRequestCount(0); // Reset request count after every interval
      }, INTERVAL_DURATION);

      return () => clearInterval(interval);
    }
  }, [token, selectedGenre, requestCount]);

  // Function to handle selecting a track
  const handleTrackSelect = (track) => {
    setSelectedMusic([...selectedMusic, track]);
  };

  // Function to handle deselecting a track
  const handleTrackDeselect = (track) => {
    setSelectedMusic(selectedMusic.filter((item) => item !== track));
  };

  const createPlaylist = () => {
    // Logic to create a playlist with selected tracks
    console.log("Selected tracks:", selectedMusic);
    navigate("/scene");
    setSelectedPlaylist(selectedMusic);
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Explore Spotify Music</h1>
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
                <TrackItem
                  key={index}
                  track={track}
                  index={index}
                  onTrackSelect={handleTrackSelect}
                  onTrackDeselect={handleTrackDeselect}
                />
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
                <PlaylistCard playlist={playlist} />
              </Col>
            ))}
          </Row>
          <Button
            onClick={createPlaylist}
            disabled={selectedMusic.length === 0}
          >
            Create Playlist
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MusicExplorer;

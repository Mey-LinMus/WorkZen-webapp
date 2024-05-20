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

          const filteredTracks = data.tracks.filter(
            (track) => !isInstrumental(track.name)
          );
          setTracks(filteredTracks || []);
        } catch (error) {
          console.error("Error fetching tracks:", error);
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
    }
  }, [token, selectedGenre]);

  // Function to handle selecting a track
  const handleTrackSelect = (track) => {
    setSelectedMusic([...selectedMusic, track]);
  };

  // Function to handle deselecting a track
  const handleTrackDeselect = (track) => {
    setSelectedMusic(selectedMusic.filter((item) => item !== track));
  };

  // Function to create a playlist with selected tracks
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

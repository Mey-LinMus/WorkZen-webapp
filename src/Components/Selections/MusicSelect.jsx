import React, { useEffect, useState } from "react";

const relaxingGenres = [
  "ambient",
  "chill",
  "classical",
  "jazz",
  "piano",
  "sleep",
];

const MusicSelect = () => {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(relaxingGenres[0]);

  useEffect(() => {
    // Fetch access token from your backend server
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
      // Fetch tracks using the access token
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
          setTracks(data.tracks || []);
        } catch (error) {
          console.error("Error fetching tracks:", error);
        }
      };

      fetchTracks();
    }
  }, [token, selectedGenre]);

  return (
    <div className="App">
      <h1>Spotify Tracks</h1>
      <label>
        Select Genre:
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {relaxingGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </label>
      <ul>
        {tracks.length > 0 ? (
          tracks.map((track, index) => (
            <li key={index}>
              {track.name} by{" "}
              {track.artists.map((artist) => artist.name).join(", ")}
              {track.preview_url && (
                <audio controls>
                  <source src={track.preview_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </li>
          ))
        ) : (
          <li>No tracks found</li>
        )}
      </ul>
    </div>
  );
};

export default MusicSelect;

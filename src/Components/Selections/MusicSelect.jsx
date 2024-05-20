import React, { useEffect, useState } from "react";

const App = () => {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);

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
    if (token) {
      // Fetch tracks using the access token
      const fetchTracks = async () => {
        try {
          const response = await fetch(
            "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          console.log(data);
          setTracks(data.tracks.items);
        } catch (error) {
          console.error("Error fetching tracks:", error);
        }
      };

      fetchTracks();
    }
  }, [token]);

  return (
    <div className="App">
      <h1>Spotify Tracks</h1>
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>
            {track.track.name} by{" "}
            {track.track.artists.map((artist) => artist.name).join(", ")}
            <audio controls>
              <source src={track.track.preview_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

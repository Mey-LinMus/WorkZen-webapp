import React, { useEffect, useState } from "react";

const App = () => {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [requestCount, setRequestCount] = useState(0);

  // Logging function to log requests
  const logRequest = (url) => {
    console.log(`Request: ${url}`);
    setRequestCount((prevCount) => prevCount + 1); // Increment request count
  };

  useEffect(() => {
    const fetchTokenAndLogRequest = async () => {
      try {
        // Log the token request
        logRequest("http://localhost:8888/token");

        // Fetch the token
        const response = await fetch("http://localhost:8888/token");
        const data = await response.json();
        setToken(data.access_token);
      } catch (error) {
        console.error("Error fetching the token:", error);
      }
    };

    fetchTokenAndLogRequest();
  }, []);

  useEffect(() => {
    if (token) {
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

      // Log the tracks request
      logRequest("https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M");

      fetchTracks();
    }
  }, [token]);

  return (
    <div className="App">
      <h1>Spotify Tracks</h1>
      <p>Total Requests: {requestCount}</p>
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

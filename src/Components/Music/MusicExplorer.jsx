import React, { useEffect, useState, useRef } from "react";

const App = () => {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [requestCount, setRequestCount] = useState(0); // State variable to track request count
  const isMounted = useRef(false); // Create a ref to track component mount state

  useEffect(() => {
    // Fetch access token from your backend server only on component mount
    if (!isMounted.current) {
      fetchToken();
      isMounted.current = true;
    }
  }, []);

  useEffect(() => {
    if (token) {
      // Fetch tracks using the access token
      fetchTracks();
    }
  }, [token]);

  const fetchToken = async () => {
    try {
      const response = await fetch("http://localhost:8888/token");
      const data = await response.json();
      setToken(data.access_token);
      setRequestCount((prevCount) => prevCount + 1); // Increment request count
    } catch (error) {
      console.error("Error fetching the token:", error);
    }
  };

  const fetchTracks = async () => {
    try {
      // Fetch tracks from a curated playlist that includes a variety of genres
      const response = await fetch(
        "https://api.spotify.com/v1/playlists/37i9dQZF1DX4WYpdgoIcn6", // Example playlist URL
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setTracks(data.tracks.items);
      setRequestCount((prevCount) => prevCount + 1); // Increment request count
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  return (
    <div className="App">
      <h1>Spotify Tracks</h1>
      <p>Total Requests: {requestCount}</p> {/* Display total request count */}
      <ul>
        {tracks.map((track, index) => {
          console.log("Track item:", track); // Log the track item
          return (
            <li key={index}>
              {track.track.name} by{" "}
              {track.track.artists.map((artist) => artist.name).join(", ")}
              <audio controls>
                <source src={track.track.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;

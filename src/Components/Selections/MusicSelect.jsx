import React, { useEffect, useState } from "react";
import Dashboard from "../Music/Dashboard";
import Login from "../Music/Login";
import "bootstrap/dist/css/bootstrap.min.css";

const URI = "http://localhost:3000/music-select";
const client_id = "1f4f7e164fe945998e2b5904bd676792";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read`;

function MusicSelect() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const [selectedVisual, setSelectedVisual] = useState(null);
  const [spotifyCode, setSpotifyCode] = useState(null); // State for Spotify code

  useEffect(() => {
    if (!code) {
      window.location.href = AUTH_URL;
    }

    const visual = JSON.parse(localStorage.getItem("selectedVisual"));
    setSelectedVisual(visual);

    localStorage.setItem("spotifyCode", code);
    setSpotifyCode(code);

    console.log("SpotifyCode", code);
  }, [code]);

  return (
    <div>
      {selectedVisual && (
        <div>
          <video
            className="video-preview"
            src={selectedVisual.video}
            type="video/mp4"
            autoPlay
            loop
            muted
          >
            Your browser does not support the video tag.
          </video>
          <p>{selectedVisual.title}</p>
        </div>
      )}
      {code ? <Dashboard code={code} /> : <Login />}
    </div>
  );
}
export default MusicSelect;

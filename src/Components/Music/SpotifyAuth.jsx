import React, { useEffect } from "react";

const client_id = "1f4f7e164fe945998e2b5904bd676792";
const redirect_uri = "http://localhost:3000/music-select";
const scope =
  "streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state user-top-read playlist-read-private playlist-read-collaborative";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`;

function SpotifyAuth({ onAuthCode }) {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  useEffect(() => {
    if (!code) {
      window.location.href = AUTH_URL;
    } else {
      localStorage.setItem("spotifyCode", code);
      onAuthCode(code);
    }
  }, [code, onAuthCode]);

  return null;
}

export default SpotifyAuth;

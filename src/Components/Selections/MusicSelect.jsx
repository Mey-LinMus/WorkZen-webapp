import React, { useEffect } from "react";
import Dashboard from "../Music/Dashboard";
import Login from "../Music/Login";
import "bootstrap/dist/css/bootstrap.min.css";

const URI = "http://localhost:3000";
const client_id = "1f4f7e164fe945998e2b5904bd676792";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read`;

function MusicSelect() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  useEffect(() => {
    if (!code) {
      window.location.href = AUTH_URL;
    }
  }, [code]);

  return code ? <Dashboard code={code} /> : <Login />;
}

export default MusicSelect;

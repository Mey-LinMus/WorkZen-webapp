import React, { useEffect, useState } from "react";
import Dashboard from "../Music/Dashboard";
import Login from "../Music/Login";
import Typography from "../ui-elements/Typography";
const URI = "https://workzen-webapp.onrender.com/music-select";
const client_id = "1f4f7e164fe945998e2b5904bd676792";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read%20playlist-read-private%20playlist-read-collaborative`;

function MusicSelect() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const [selectedVisual, setSelectedVisual] = useState(null);

  useEffect(() => {
    if (!code) {
      window.location.href = AUTH_URL;
    } else {
      const visual = JSON.parse(localStorage.getItem("selectedVisual"));
      setSelectedVisual(visual);
      localStorage.setItem("spotifyCode", code);
    }
  }, [code]);

  return (
    <div className="p-4 bg-gradient-to-b from-custom-gradient-start via-custom-gradient-middle to-custom-gradient-end">
      {selectedVisual && (
        <div>
          {/* <video
            className=""
            src={selectedVisual.video}
            type="video/mp4"
            autoPlay
            loop
            muted
          >
            Your browser does not support the video tag.
          </video> */}
        </div>
      )}
      {code ? <Dashboard code={code} /> : <Login />}
    </div>
  );
}
export default MusicSelect;

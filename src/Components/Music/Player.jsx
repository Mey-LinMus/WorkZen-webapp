import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUris }) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUris]);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackUris}
    />
  );
}

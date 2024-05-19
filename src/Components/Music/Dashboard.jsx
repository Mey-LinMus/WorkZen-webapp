import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
// import TrackSearchResult from "./TrackSearchResult";
// import Player from "./Player";
import useAuth from "../Music/UserAuth";

const spotifyApi = new SpotifyWebApi({
  clientId: "1f4f7e164fe945998e2b5904bd676792",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [allSongs, setAllSongs] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();

  function chooseTrack(track) {
    setPlayingTrack(track);
  }

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);

    // Fetch all songs
    spotifyApi
      .getMySavedTracks({ limit: 50 })
      .then((data) => {
        setAllSongs(
          data.body.items.map((item) => {
            const track = item.track;

            console.log(track);

            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              track.album.images[0]
            );
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
            };
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      });
  }, [accessToken]);

  return <div></div>;
}

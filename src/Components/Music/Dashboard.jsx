import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackResults";
import Player from "./Player";
import useAuth from "./useAuth";
import { Container } from "react-bootstrap";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "1f4f7e164fe945998e2b5904bd676792",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  function chooseTrack(track) {
    setPlayingTrack(track);
    setLyrics("");
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    // Array of playlist IDs
    const playlistIds = [
      "37i9dQZF1DX4sWSpwq3LiO",
      "37i9dQZF1DWV7EzJMK2FUI",
      "37i9dQZF1DWZqd5JICZI0u",
      "37i9dQZF1DXebxttQCq0zA",
      "37i9dQZF1DWWQRwui0ExPn",
      "37i9dQZF1DWVFeEut75IAL",
    ];

    // Fetch tracks from each playlist
    const fetchPlaylistTracks = async (playlistId) => {
      try {
        const response = await spotifyApi.getPlaylistTracks(playlistId);
        return response.body.items.map((item) => {
          const track = item.track;
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
        });
      } catch (error) {
        console.error("Error fetching playlist tracks:", error);
        return [];
      }
    };

    // Fetch tracks from all playlists
    const fetchAllPlaylistTracks = async () => {
      const promises = playlistIds.map((playlistId) =>
        fetchPlaylistTracks(playlistId)
      );
      const allPlaylistTracks = await Promise.all(promises);
      const mergedTracks = allPlaylistTracks.flat();
      setPlaylistTracks(mergedTracks);
    };

    fetchAllPlaylistTracks();
  }, [accessToken]);

  useEffect(() => {
    if (!playingTrack) return;

    // Fetch lyrics for the playing track
    axios
      .get("http://localhost:8888/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {playlistTracks.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {playlistTracks.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  );
}

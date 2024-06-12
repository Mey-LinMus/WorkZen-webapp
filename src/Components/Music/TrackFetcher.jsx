import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "1f4f7e164fe945998e2b5904bd676792",
});

function TrackFetcher({ accessToken, playlistId, onTracksFetched }) {
  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      try {
        const response = await spotifyApi.getPlaylistTracks(playlistId);
        const tracks = response.body.items.map((item) => {
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
            title:
              track.name.length > 25
                ? `${track.name.substring(0, 25)}...`
                : track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
            duration_ms: track.duration_ms,
          };
        });
        onTracksFetched(tracks);
      } catch (error) {
        console.error("Error fetching playlist tracks:", error);
        onTracksFetched([]);
      }
    };

    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      fetchPlaylistTracks();
    }
  }, [accessToken, playlistId, onTracksFetched]);

  return null;
}

export default TrackFetcher;

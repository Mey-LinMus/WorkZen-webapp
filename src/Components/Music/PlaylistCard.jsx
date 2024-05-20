import React from "react";
import { Card } from "react-bootstrap";

const PlaylistCard = ({ playlist }) => {
  return (
    <Card>
      <Card.Img variant="top" src={playlist.images[0].url} />
      <Card.Body>
        <Card.Title>{playlist.name}</Card.Title>
        <Card.Text>
          {playlist.description || "No description available"}
        </Card.Text>
        <a
          href={playlist.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Spotify
        </a>
      </Card.Body>
    </Card>
  );
};

export default PlaylistCard;

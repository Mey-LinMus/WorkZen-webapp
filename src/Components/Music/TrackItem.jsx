import React from "react";
import { ListGroup, Image } from "react-bootstrap";

const TrackItem = ({ track }) => {
  return (
    <ListGroup.Item className="d-flex align-items-center">
      <Image
        src={track.album.images[0].url}
        alt={track.album.name}
        thumbnail
        width={64}
        height={64}
        className="mr-3"
      />
      <div>
        <strong>{track.name}</strong>
        <br />
        <small>{track.artists.map((artist) => artist.name).join(", ")}</small>
        <br />
        {track.preview_url && (
          <audio controls className="mt-2">
            <source src={track.preview_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </ListGroup.Item>
  );
};

export default TrackItem;

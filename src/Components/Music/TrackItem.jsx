import React from "react";
import { ListGroup, FormCheck, Image } from "react-bootstrap";

const TrackItem = ({ track, index, onTrackSelect, onTrackDeselect }) => {
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      onTrackSelect(track);
    } else {
      onTrackDeselect(track);
    }
  };

  return (
    <ListGroup.Item key={index} className="d-flex align-items-center">
      <FormCheck
        type="checkbox"
        id={`track-${index}`}
        label={track.name}
        onChange={handleCheckboxChange}
      />
      <Image
        src={track.album.images[0].url}
        alt={track.album.name}
        thumbnail
        width={64}
        height={64}
        className="mr-3"
      />
    </ListGroup.Item>
  );
};

export default TrackItem;

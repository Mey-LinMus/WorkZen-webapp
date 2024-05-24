import React from "react";
import { Button } from "react-bootstrap";
import visualsData from "../../visuals.json";
import "../../Styles/visualPage.css";

const VisualSelect = ({ onSelect }) => {
  const visuals = visualsData.visuals;

  return (
    <div>
      <h1>Select a Visual</h1>
      {visuals.map((visual) => (
        <Button
          key={visual.id}
          className="video-button"
          variant="outline-primary"
          onClick={() => onSelect(visual)}
        >
          <video
            className="video-preview"
            src={visual.video}
            type="video/mp4"
            autoPlay
            loop
            muted
          >
            Your browser does not support the video tag.
          </video>
          <p>{visual.title}</p>
        </Button>
      ))}
    </div>
  );
};

export default VisualSelect;

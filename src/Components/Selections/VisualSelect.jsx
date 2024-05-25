import React from "react";
import { Button } from "react-bootstrap";
import visualsData from "../../visuals.json";
import "../../Styles/visualPage.css";

const VisualSelect = ({ onVisualSelect }) => {
  const visuals = visualsData.visuals;

  const handleVisualClick = (visual) => {
    onVisualSelect(visual);
  };

  return (
    <div>
      {visuals.map((visual) => (
        <Button
          key={visual.id}
          className="video-button"
          variant="outline-primary"
          onClick={() => handleVisualClick(visual)}
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

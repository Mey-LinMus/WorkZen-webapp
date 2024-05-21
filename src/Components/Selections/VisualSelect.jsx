import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import visualsData from "../../visuals.json";
import "../../Styles/visualPage.css";

const VisualSelectPage = () => {

  const [visuals, setVisuals] = useState(visualsData.visuals); // Use the imported JSON data

  return (
    <div>
      <h1>Select a Visual</h1>
      {visuals.map((visual) => (
        <Button
          key={visual.id}
          className="video-button"
          variant="outline-primary"
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

export default VisualSelectPage;

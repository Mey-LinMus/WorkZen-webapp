import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectionContext } from "../Contexts/SelectionContext";
import { Button } from "react-bootstrap";
import visualsData from "../../visuals.json";
import "../../Styles/visualPage.css";

const VisualSelectPage = () => {
  const { setSelectedVisual } = useContext(SelectionContext);
  const navigate = useNavigate();
  const [visuals, setVisuals] = useState(visualsData.visuals); // Use the imported JSON data

  const handleSelect = async (visual) => {
    // Dynamically import the component
    const component = await import(`../Visuals/${visual.component}.jsx`);
    setSelectedVisual({ title: visual.title, Component: component.default });
    navigate("/music-select");
  };

  return (
    <div>
      <h1>Select a Visual</h1>
      {visuals.map((visual) => (
        <Button
          key={visual.id}
          className="video-button"
          onClick={() => handleSelect(visual)}
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

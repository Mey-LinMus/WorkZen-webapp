import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectionContext } from "../Contexts/SelectionContext";
import visualsData from "../../visuals.json";

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
        <button key={visual.id} onClick={() => handleSelect(visual)}>
          {visual.title}
        </button>
      ))}
    </div>
  );
};

export default VisualSelectPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import VisualSelect from "./Components/Selections/VisualSelect";

const VisualSelectPage = ({ setSelectedVisual, selectedVisual }) => {
  const navigate = useNavigate();

  const handleVisualSelect = (visual) => {
    setSelectedVisual(visual);
    navigate("/music-select");
  };

  return (
    <div>
      <h1>Select a Visual</h1>
      <VisualSelect onVisualSelect={handleVisualSelect} />
    </div>
  );
};

export default VisualSelectPage;

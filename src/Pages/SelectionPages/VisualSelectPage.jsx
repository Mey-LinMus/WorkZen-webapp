// src/pages/VisualSelectPage.js

import React from "react";
import { useNavigate } from "react-router-dom";
import VisualSelect from "../../Components/Selections/VisualSelect";
import { useSelection } from "../../Components/Contexts/SelectionContext";

function VisualSelectPage() {
  const navigate = useNavigate();
  const { setSelectedVisual } = useSelection();

  const handleVisualSelect = (visual) => {
    setSelectedVisual(visual);
    console.log("Selected Visual:", visual);
    navigate("/music-select");
  };

  return (
    <div>
      <VisualSelect onSelect={handleVisualSelect} />
    </div>
  );
}

export default VisualSelectPage;

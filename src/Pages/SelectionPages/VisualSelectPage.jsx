import React from "react";
import { useNavigate } from "react-router-dom";
import VisualSelect from "../../Components/Selections/VisualSelect";

function VisualSelectPage() {
  const navigate = useNavigate();

  const navigateToMusicSelect = () => {
    navigate("/music-select");
  };

  return (
    <div>
      <VisualSelect onSelect={navigateToMusicSelect} />
    </div>
  );
}

export default VisualSelectPage;

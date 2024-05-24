import React from "react";
import { useNavigate } from "react-router-dom";
import MusicSelect from "../../Components/Selections/MusicSelect";
import { useSelection } from "../../Components/Contexts/SelectionContext";

function MusicSelectPage() {
  const navigate = useNavigate();
  const { setSelectedMusic } = useSelection();

  const handleMusicSelect = (music) => {
    console.log("Selected Music:", music);
    setSelectedMusic(music);
  };

  const handleNextClick = () => {
    navigate("/scene");
  };

  return (
    <div>
      <MusicSelect onSelect={handleMusicSelect} />
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
}

export default MusicSelectPage;

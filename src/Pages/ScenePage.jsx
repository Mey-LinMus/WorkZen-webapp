import React from "react";
import Scene from "../Components/Scene";

const ScenePage = ({ selectedVisual, selectedSong }) => {
  return (
    <div>
      <h1>Scene</h1>
      <Scene selectedVisual={selectedVisual} selectedSong={selectedSong} />
    </div>
  );
};

export default ScenePage;

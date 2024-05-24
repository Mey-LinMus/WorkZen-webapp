import React from "react";
import { useSelection } from "../Components/Contexts/SelectionContext";

function ScenePage() {
  const { selectedVisual, selectedMusic } = useSelection();

  return (
    <div>
      <h1>ScenePage</h1>
      {selectedVisual && (
        <div>
          <h2>Selected Visual</h2>
          <video
            src={selectedVisual.video}
            type="video/mp4"
            controls
            autoPlay
            loop
          />
          <p>{selectedVisual.title}</p>
        </div>
      )}
      {selectedMusic && (
        <div>
          <h2>Selected Music</h2>
          <p>
            {selectedMusic.title} by {selectedMusic.artist}
          </p>
        </div>
      )}
    </div>
  );
}

export default ScenePage;

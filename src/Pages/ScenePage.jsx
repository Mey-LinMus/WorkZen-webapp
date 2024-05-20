// ScenePage.js
import React, { useContext } from "react";
import { SelectionContext } from "../Components/Contexts/SelectionContext";

const ScenePage = () => {
  const { selectedVisual, selectedMusic, selectedPlaylist } =
    useContext(SelectionContext);
  const VisualComponent = selectedVisual ? selectedVisual.Component : null;

  return (
    <div>
      <h1>Your Selections</h1>
      <div>
        <h2>Selected Visual:</h2>
        {VisualComponent ? <VisualComponent /> : <p>No visual selected</p>}
      </div>
      <div>
        <h2>Selected Music:</h2>
        {selectedMusic.length > 0 ? (
          <ul>
            {selectedMusic.map((track, index) => (
              <li key={index}>{track.name}</li>
            ))}
          </ul>
        ) : (
          <p>No music selected</p>
        )}
      </div>
    </div>
  );
};

export default ScenePage;

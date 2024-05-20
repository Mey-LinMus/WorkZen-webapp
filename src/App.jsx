import React from "react";
import SphereSceneVisual from "./Components/Visuals/SphereSceneVisual";
import SnowingSceneVisual from "./Components/Visuals/SnowingSceneVisual";
import SelectionsPage from "./Pages/SelectionPage";
import MusicSelect from "./Components/Selections/MusicSelect";

function App() {
  return (
    <div className="App">
      {/* <SnowingSceneVisual /> */}
      <MusicSelect />
    </div>
  );
}

export default App;

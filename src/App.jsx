import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SphereSceneVisual from "./Components/Visuals/SphereSceneVisual";
import SnowingSceneVisual from "./Components/Visuals/SnowingSceneVisual";
import SelectionsPage from "./Pages/SelectionPage";
import MusicSelect from "./Components/Selections/MusicSelect";

function App() {
  return (
    <div className="App">
      {/* <SnowingSceneVisual /> */}
      <SelectionsPage />
    </div>
  );
}

export default App;

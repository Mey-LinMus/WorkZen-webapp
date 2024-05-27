import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VisualSelect from "../../Components/Selections/VisualSelect";
import MusicSelect from "../../Components/Selections/MusicSelect";
import ScenePage from "../ScenePage";

function SelectionPage() {
  return (
    <Router>
      <Routes>
        <Route path="/scene-page" element={<ScenePage />} />
        <Route path="/music-select" element={<MusicSelect />} />
        <Route path="/" element={<VisualSelect />} />
        
      </Routes>
    </Router>
  );
}

export default SelectionPage;

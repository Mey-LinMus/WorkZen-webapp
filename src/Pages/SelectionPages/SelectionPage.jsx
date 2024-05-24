import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VisualSelectPage from "./VisualSelectPage";
import MusicSelectPage from "./MusicSelectPage";
import ScenePage from "../ScenePage";

function SelectionPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VisualSelectPage />} />
        <Route path="/music-select" element={<MusicSelectPage />} />
        <Route path="/scene" element={<ScenePage />} />
      </Routes>
    </Router>
  );
}

export default SelectionPage;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VisualSelect from "../Components/Selections/VisualSelect";
import MusicSelect from "../Components/Selections/MusicSelect";
import ScenePage from "./ScenePage";
import { SelectionProvider } from "../Components/Contexts/SelectionContext";

function SelectionPage() {
  return (
    <SelectionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<VisualSelect />} />
          <Route path="/music-select" element={<MusicSelect />} />
          <Route path="/scene" element={<ScenePage />} />
        </Routes>
      </Router>
    </SelectionProvider>
  );
}

export default SelectionPage;

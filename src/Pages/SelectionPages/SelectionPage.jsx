import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import VisualSelectPage from "./VisualSelectPage";
import MusicSelectPage from "./MusicSelectPage";

function SelectionPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/visual-select" />} />
        <Route path="/visual-select" element={<VisualSelectPage />} />
        <Route path="/music-select" element={<MusicSelectPage />} />
        <Route path="*" element={<Navigate to="/visual-select" />} />
      </Routes>
    </Router>
  );
}

export default SelectionPage;

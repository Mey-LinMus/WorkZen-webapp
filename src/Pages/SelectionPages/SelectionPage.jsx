import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../../Pages/HomePage";
import VisualSelect from "../../Components/Selections/VisualSelect";
import MusicSelect from "../../Components/Selections/MusicSelect";
import MakeChoice from "../../Pages/MakeChoicePage";
import ScenePage from "../ScenePage";
import Favorites from "../FavoritesPage";
import Navigation from "../../Components/Navigation/NavigationBar";

function SelectionPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScenePage />} />
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/visual-select" element={<VisualSelect />} />
        <Route path="/make-choice" element={<MakeChoice />} />
        <Route path="/music-select" element={<MusicSelect />} /> */}
        {/* <Route path="/scene-page" element={<ScenePage />} />
        <Route path="/favorites" element={<Favorites />} /> */}
      </Routes>
    </Router>
  );
}

export default SelectionPage;

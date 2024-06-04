import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../../Pages/HomePage";
import VisualSelect from "../../Components/Selections/VisualSelect";
import MusicSelect from "../../Components/Selections/MusicSelect";
import MakeChoice from "../../Pages/MakeChoicePage";
import ScenePage from "../ScenePage";
import StepNavigator from "../../Components/Selections/StepNavigator";

function SelectionPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/visual-select"
          element={
            <>
              <VisualSelect />
              <StepNavigator currentStep={1} />
            </>
          }
        />
        <Route
          path="/make-choice"
          element={
            <>
              <MakeChoice />
              <StepNavigator currentStep={2} />
            </>
          }
        />
        <Route
          path="/music-select"
          element={
            <>
              <MusicSelect />
              <StepNavigator currentStep={3} />
            </>
          }
        />
        <Route path="/scene-page" element={<ScenePage />} currentStep={4} />
      </Routes>
    </Router>
  );
}

export default SelectionPage;

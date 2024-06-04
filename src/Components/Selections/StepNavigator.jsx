import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "../ui-elements/Typography";

const StepNavigator = ({ currentStep }) => {
  const navigate = useNavigate();
  const totalSteps = 3; // Set the total number of steps

  const handlePrevClick = () => {
    switch (currentStep) {
      case 1:
        navigate("/");
        break;
      case 2:
        navigate("/visual-select");
        break;
      case 3:
        navigate("/make-choice");
        break;
      default:
        break;
    }
  };

  const handleNextClick = () => {
    switch (currentStep) {
      case 1:
        navigate("/make-choice");
        break;
      case 2:
        navigate("/music-select");
        break;
      case 3:
        navigate("/scene-page");
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center p-4 bg-gray-800">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handlePrevClick}
        disabled={currentStep === 1}
      >
        Previous
      </button>
      <div className="text-white">
        <Typography variant="bodyText">
          {currentStep} / {totalSteps}
        </Typography>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleNextClick}
        disabled={currentStep === totalSteps}
      >
        Next
      </button>
    </div>
  );
};

export default StepNavigator;

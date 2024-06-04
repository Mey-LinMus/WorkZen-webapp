import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "../ui-elements/Typography";

const StepNavigator = ({ currentStep }) => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const handlePrevClick = () => {
    switch (currentStep) {
      case 2:
        navigate("/");
        break;
      case 3:
        navigate("/visual-select");
        break;
      case 4:
        navigate("/make-choice");
        break;
      default:
        break;
    }
  };

  const handleNextClick = () => {
    switch (currentStep) {
      case 1:
        const selectedVisual = JSON.parse(
          localStorage.getItem("selectedVisual")
        );
        if (selectedVisual) {
          navigate("/visual-select");
        } else {
          setShowMessage(true);
        }
        break;
      case 2:
        const selectedOption = localStorage.getItem("selectedOption");
        if (selectedOption) {
          navigate("/make-choice");
        } else {
          alert("Please select an option first.");
        }
        break;
      case 3:
        navigate("/music-select");
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col justify-between items-center p-4 bg-gray-800">
      <div className="w-full flex justify-between items-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handlePrevClick}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        <div className="text-white">
          <Typography variant="bodyText">Step {currentStep} of 3</Typography>
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleNextClick}
          disabled={currentStep === 3}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepNavigator;

import React, { useState } from "react";
import Typography from "../Components/ui-elements/Typography";
import UILogo from "../Components/ui-elements/Logo";
import StyledButton from "../Components/ui-elements/Button";
import { useNavigate } from "react-router-dom";

function MakeChoicePage() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    if (selectedOption) {
      // Perform any necessary actions with the selected option
      navigate("/music-select");
    } else {
      alert("Please select an option first.");
    }
  };

  return (
    <div className="bg-primaryColor min-h-screen flex flex-col items-center">
      <UILogo className="mt-12 md:mt-16 lg:mt-20" />

      <div className="mt-12 md:mt-16 lg:mt-20 text-center">
        <Typography variant="h1" className="text-2xl md:text-3xl lg:text-4xl">
          Maak je keuze
        </Typography>
      </div>

      <div className="mt-8 md:mt-12 lg:mt-16 flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 items-center">
        <StyledButton
          onClick={() => handleOptionClick("custom")}
          selected={selectedOption === "custom"}
          className="px-4 py-2 text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg"
        >
          Maak zelf een selectie van liedjes
        </StyledButton>
        <StyledButton
          onClick={() => handleOptionClick("suggested")}
          selected={selectedOption === "suggested"}
          className="px-4 py-2 text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg"
        >
          Voorgestelde selectie liedjes
        </StyledButton>
      </div>

      {/* <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleNextClick}
      >
        Next
      </button> */}
    </div>
  );
}

export default MakeChoicePage;

import React, { useState } from "react";
import Typography from "../Components/ui-elements/Typography";
import UILogo from "../Components/ui-elements/Logo";
import StyledButton from "../Components/ui-elements/Button";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

function MakeChoicePage() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    if (selectedOption) {
      navigate("/music-select");
    } else {
      alert("Please select an option first.");
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gradient-to-b from-custom-gradient-start via-custom-gradient-middle to-custom-gradient-end min-h-screen flex flex-col items-center">
      <UILogo className="mt-12 md:mt-16 lg:mt-20" />
      <div className="mt-12 md:mt-16 lg:mt-20 text-center">
        <Typography variant="h1" className="text-2xl md:text-3xl lg:text-4xl">
          Maak je keuze
        </Typography>
      </div>

      <div className="mt-8 md:mt-12 lg:mt-16 flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 items-center">
        <button
          onClick={() => handleOptionClick("custom")}
          selected={selectedOption === "custom"}
          className="border-solid border-neutralColor border rounded-lg text-neutralColor px-6 py-4 sm:px-8 sm:py-6 lg:px-10 lg:py-8 transition duration-300 ease-in-out transform focus:outline-none px-4 py-2 text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg hover:border-2 active:border-2 focus:ring focus:ring-violet-300"
        >
          Maak zelf een selectie van liedjes
        </button>
        <button
          onClick={() => handleOptionClick("suggested")}
          selected={selectedOption === "suggested"}
          className="border-solid border-neutralColor border rounded-lg text-neutralColor px-6 py-4 sm:px-8 sm:py-6 lg:px-10 lg:py-8 transition duration-300 ease-in-out transform focus:outline-none px-4 py-2 text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg hover:border-2 active:border-2 focus:outline-none focus:ring focus:ring-violet-300"
        >
          Voorgestelde selectie liedjes
        </button>
      </div>

      <div className="mt-28 px-4 py-2 flex space-x-28 items-center ">
        <StyledButton onClick={handleBackClick}>
          <HiArrowLeft />
        </StyledButton>
        <div>
          <p className="text-neutralColor"> 2 / 3</p>
        </div>

        <StyledButton selected onClick={handleNextClick}>
          <HiArrowRight />
        </StyledButton>
      </div>
    </div>
  );
}
export default MakeChoicePage;

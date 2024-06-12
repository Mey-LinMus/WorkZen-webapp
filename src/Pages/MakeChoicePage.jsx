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
      if (selectedOption === "suggested") {
        const visual = JSON.parse(localStorage.getItem("selectedVisual"));
        if (visual && visual.playlistId) {
          localStorage.setItem("selectedPlaylistId", visual.playlistId);
        }
      }
      navigate("/music-select");
    } else {
      alert("Please select an option first.");
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gradient-to-b from-custom-gradient-start via-custom-gradient-middle to-custom-gradient-end min-h-screen flex flex-col items-center justify-center">
      <div className="md:block hidden">
        <UILogo />
      </div>
      <div className="mt-12 md:mt-12 lg:mt-12 text-center">
        <Typography variant="h1" className="text-2xl md:text-3xl lg:text-4xl">
          Maak je keuze
        </Typography>
      </div>

      <div className="mt-12 md:mt-12 lg:mt-16 flex flex-row justify-center space-x-4 md:space-x-8 items-center w-full">
        <button
          onClick={() => handleOptionClick("custom")}
          selected={selectedOption === "custom"}
          className={`border-solid border-neutralColor border rounded-lg w-4/12 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 transition duration-300 ease-in-out transform focus:outline-none text-sm md:text-base lg:text-lg hover:border-2 active:border-2 focus:ring focus:ring-violet-300 px-2.5 ${
            selectedOption === "custom"
              ? "bg-primaryColor text-white shadow-lg"
              : "text-neutralColor"
          }`}
        >
          Maak zelf een selectie van liedjes
        </button>
        <button
          onClick={() => handleOptionClick("suggested")}
          selected={selectedOption === "suggested"}
          className={`border-solid border-neutralColor border rounded-lg w-4/12 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 transition duration-300 ease-in-out transform focus:outline-none text-sm md:text-base lg:text-lg hover:border-2 active:border-2 focus:ring focus:ring-violet-300 px-2.5 ${
            selectedOption === "suggested"
              ? "bg-primaryColor text-white shadow-lg"
              : "text-neutralColor"
          }`}
        >
          Voorgestelde selectie liedjes
        </button>
      </div>

      <div className="mt-28 mb-6 px-4 py-2 flex space-x-28 items-center">
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

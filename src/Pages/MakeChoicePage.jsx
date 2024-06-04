import React from "react";
import Typography from "../../src/Components/ui-elements/Typography";
import UILogo from "../../src/Components/ui-elements/Logo";
import StyledButton from "../../src/Components/ui-elements/Button";
import { useNavigate } from "react-router-dom";

function MakeChoicePage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/music-select");
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
          onClick={handleButtonClick}
          selected
          className="px-4 py-2 text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg"
        >
          Maak zelf een selectie van liedjes
        </StyledButton>
        <StyledButton
          selected
          className="px-4 py-2 text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg"
        >
          Voorgestelde selectie liedjes
        </StyledButton>
      </div>
    </div>
  );
}

export default MakeChoicePage;

import React from "react";
import Typography from "../ui-elements/Typography";
import StyledButton from "../ui-elements/Button";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/visual-select");
  };

  return (
    <div className="bg-secondaryColor min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="mb-4">
        <Typography variant="h2">Get Started</Typography>
      </div>
      <div className="mb-4">
        <Typography variant="bodyText">
          Wacht niet langer. Druk op "Start" om deze bewezen methoden voor
          stressvermindering te ervaren en je welzijn te verbeteren.
        </Typography>
      </div>
      <div className="mb-8 mt-4">
        <StyledButton selected onClick={handleStartClick}>
          Start
        </StyledButton>
      </div>
    </div>
  );
};

export default Footer;

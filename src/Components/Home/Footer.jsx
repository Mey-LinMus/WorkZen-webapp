import React from "react";
import Typography from "../ui-elements/Typography";
import StyledButton from "../ui-elements/Button";

const Footer = () => {
  return (
    <div className="bg-secondaryColor min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="mb-4">
        <Typography variant="h2">Get Started</Typography>
      </div>
      <div className="mb-4">
        <Typography variant="bodyText">
          Wacht niet langer. Druk op "Start" om deze bewezen methoden voor
          stressvermindering <br /> te ervaren en je welzijn te verbeteren.
        </Typography>
      </div>
      <div className="mb-8 mt-4">
        <StyledButton>Start</StyledButton>
      </div>
    </div>
  );
};

export default Footer;

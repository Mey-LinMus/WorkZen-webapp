import React from "react";
import StyledButton from "../ui-elements/Button";
import Typography from "../ui-elements/Typography";
import UILogo from "../ui-elements/Logo";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/visual-select");
  };

  return (
    <div className="relative h-screen flex flex-col justify-center bg-primaryColor">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-10 brightness-50"
        autoPlay
        loop
        muted
      >
        <source src="/Videos/SnowingScene-horizontal.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="z-10">
        <UILogo />
      </div>
      <div className="absolute top-0 right-0 m-4 z-10">
        <StyledButton onClick={handleStartClick}>Start</StyledButton>
      </div>
      <div className="flex justify-center px-4 relative z-10">
        <Typography variant="h1">WorkZen</Typography>
      </div>
    </div>
  );
};

export default Header;

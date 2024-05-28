import React from "react";
import StyledButton from "../ui-elements/Button";
import Typography from "../ui-elements/Typography";
import UILogo from "../ui-elements/Logo";

const Header = () => {
  return (
    <div className="bg-primaryColor text-neutralColor font-sans relative h-screen flex flex-col justify-center">
      <UILogo />
      <div className="absolute top-0 right-0 m-4">
        <StyledButton>Start</StyledButton>
      </div>
      <div className="flex justify-center px-4">
        <Typography variant="h1">WorkZen</Typography>
      </div>
    </div>
  );
};

export default Header;

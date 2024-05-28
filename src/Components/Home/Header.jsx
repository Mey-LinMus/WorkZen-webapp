import React from "react";
import Logo from "../../Assets/Logo/logo-white.svg";
import StyledButton from "../ui-elements/Button";
import Typography from "../ui-elements/Typography";

const Header = () => {
  return (
    <div className="bg-primaryColor text-neutralColor font-sans relative h-screen flex flex-col justify-center">
      <div className="absolute top-0 left-0 m-4">
        <img
          src={Logo}
          alt="logo"
          className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
        />
      </div>
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

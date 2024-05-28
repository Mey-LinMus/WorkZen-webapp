import React from "react";
import Logo from "../../Assets/Logo/logo-white.svg";

const UILogo = () => {
  return (
    <div
      className={`absolute top-0 left-0 m-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 `}
    >
      <img src={Logo} alt="logo" className="w-full h-full" />
    </div>
  );
};

export default UILogo;

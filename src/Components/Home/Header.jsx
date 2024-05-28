import React from "react";
import Logo from "../../Assets/Logo/logo-white.svg";

const Header = () => {
  return (
    <div className="bg-primaryColor text-neutralColor font-sans flex justify-between items-center px-4 py-2">
      <div className="flex items-center">
        <img src={Logo} alt="logo" className="w-12 h-12 mr-2" />
        <h1 className="font-urbane text-h1 mb-4">WorkZen</h1>
      </div>
      <button className="bg-neutralColor text-primaryColor font-segoe text-body">
        Start
      </button>
    </div>
  );
};

export default Header;

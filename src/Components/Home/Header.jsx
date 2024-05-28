import React from "react";
import Logo from "../../Assets/Logo/logo-white.svg";

const Header = () => {
  return (
    <div className="bg-primaryColor text-neutralColor font-sans relative">
      <div className="flex justify-between items-center px-4 py-2">
        <div>
          <img src={Logo} alt="logo" className="w-12 h-12 mr-2" />
        </div>
        <button className="bg-neutralColor text-primaryColor font-segoe text-body px-12 rounded-full shadow-lg absolute top-0 right-0 m-4">
          Start
        </button>
      </div>
      <div className="flex justify-center">
        <h1 className="font-urbane text-h1 mb-0">WorkZen</h1>
      </div>
    </div>
  );
};

export default Header;

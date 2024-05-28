import React from "react";
import Logo from "../../Assets/Logo/logo-white.svg";

const Header = () => {
  return (
    <div className="bg-primaryColor text-neutralColor font-sans relative h-screen flex flex-col justify-center">
      <div className="absolute top-0 left-0 m-4">
        <img src={Logo} alt="logo" className="w-12 h-12" />
      </div>
      <button className="bg-neutralColor text-primaryColor font-segoe text-body px-12 rounded-full shadow-lg absolute top-0 right-0 m-4">
        Start
      </button>
      <div className="flex justify-center">
        <h1 className="font-urbane text-h1 mb-0">WorkZen</h1>
      </div>
    </div>
  );
};

export default Header;

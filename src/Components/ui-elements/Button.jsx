import React from "react";

const StyledButton = ({ children, onClick }) => {
  return (
    <button
      className="bg-neutralColor text-primaryColor font-segoe text-body px-8 py-2 sm:px-10 sm:py-3 lg:px-12 lg:py-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default StyledButton;

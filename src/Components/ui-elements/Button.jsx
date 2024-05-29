import React from "react";

const StyledButton = ({ children, onClick, selected }) => {
  const buttonClassName = selected
    ? "bg-neutralColor text-primaryColor font-segoe text-body px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4  rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
    : "border-solid border-neutralColor border rounded-full text-neutralColor px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none";

  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default StyledButton;

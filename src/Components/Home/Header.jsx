import React from "react";
// import "../../Styles/tailwind.css";

const Header = ({ children }) => {
  return (
    <div className="bg-primaryColor text-neutralColor font-sans">
      <h1 className="font-urbane text-h1 mb-4">WorkZen</h1>
      <h2 className="font-urbane text-h2 mb-4">Heading 2</h2>
      <h3 className="font-urbane text-h3 mb-4">Heading 3</h3>
      <p className="font-sans text-bg">Body text</p>
      <button className="bg-neutralColor text-primaryColor font-sans">
        {children}
        button
      </button>
    </div>
  );
};

export default Header;

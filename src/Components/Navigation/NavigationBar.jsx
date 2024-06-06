import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-40 ">
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={toggleMenu}
                type="button"
                className="bg-secondaryColor inline-flex items-center justify-center p-2 rounded-md text-neutralColor hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block w-4 h-4" // Adjust the width and height here
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block w-4 h-4" // Adjust the width and height here
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="-mr-2 flex"></div>
          </div>
        </div>

        <div className={`${isOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 ml-4 bg-primaryColor rounded-lg">
            <Link
              to="/favorites"
              className="text-neutralColor hover:bg-secondaryColor block px-3 py-2 rounded-md text-base font-medium"
            >
              Favorieten
            </Link>
            <Link
              to="/musicChange"
              className="text-neutralColor hover:bg-secondaryColor block px-3 py-2 rounded-md text-base font-medium"
            >
              Muziek
            </Link>
            <Link
              to="/visualChange"
              className="text-neutralColor hover:bg-secondaryColor block px-3 py-2 rounded-md text-base font-medium"
            >
              Visual
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineRefresh, HiHeart } from "react-icons/hi";

const NavigationBar = ({ onVisualChangeClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-40 absolute">
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={toggleMenu}
                type="button"
                className="bg-secondaryColor inline-flex items-center justify-center p-2 rounded-md text-neutralColor hover:text-white hover:bg-gray-800 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                {!isOpen ? (
                  <svg
                    className="block w-4 h-4"
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
                    className="block w-4 h-4"
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
            <button
              onClick={() => navigate("/favorites")}
              className="text-neutralColor hover:bg-secondaryColor block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <HiHeart className="inline mr-2" /> Favorieten
            </button>
            <Link
              to="/music-select"
              className="text-neutralColor hover:bg-secondaryColor block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <HiOutlineRefresh className="inline mr-2" /> Muziek
            </Link>
            <button
              onClick={onVisualChangeClick}
              className="text-neutralColor hover:bg-secondaryColor block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <HiOutlineRefresh className="inline mr-2" />
              Visual
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;

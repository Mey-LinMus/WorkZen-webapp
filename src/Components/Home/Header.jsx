import React, { useState, useEffect } from "react";
import StyledButton from "../ui-elements/Button";
import Typography from "../ui-elements/Typography";
import UILogo from "../ui-elements/Logo";
import { useNavigate } from "react-router-dom";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

const Header = () => {
  const navigate = useNavigate();

  const videoSources = [
    "/Videos/SnowingScene-horizontal.mp4",
    "/Videos/SphereScene-horizontal.mp4",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) =>
        prevIndex === videoSources.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStartClick = () => {
    navigate("/visual-select");
  };

  const handleFavoritesClick = () => {
    navigate("/favorite-page");
  };

  return (
    <div className="relative h-screen flex flex-col justify-center bg-primaryColor">
      {videoSources.map((src, index) => (
        <video
          key={src}
          className={`absolute top-0 left-0 w-full h-full object-cover z-10 brightness-50 transition-opacity duration-1000 ${
            currentVideoIndex === index ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}
      <div className="z-20">
        <UILogo />
      </div>
      <div className="absolute top-0 right-0 m-4 z-20 space-x-4">
        <StyledButton onClick={handleStartClick}>Start</StyledButton>
        <StyledButton onClick={handleFavoritesClick}>Favorieten </StyledButton>
      </div>
      <div className="flex justify-center px-4 relative z-20">
        <Typography variant="h1">WorkZen</Typography>
      </div>
      {showArrow && (
        <div className="absolute bottom-10 w-full flex justify-center z-20">
          <HiOutlineChevronDoubleDown className="text-white text-4xl animate-bounce" />
        </div>
      )}
    </div>
  );
};

export default Header;

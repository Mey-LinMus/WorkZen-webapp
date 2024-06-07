import React, { useState, useEffect } from "react";
import StyledButton from "../ui-elements/Button";
import Typography from "../ui-elements/Typography";
import UILogo from "../ui-elements/Logo";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const videoSources = [
    "/Videos/SnowingScene-horizontal.mp4",
    "/Videos/SphereScene-horizontal.mp4",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) =>
        prevIndex === videoSources.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleStartClick = () => {
    navigate("/visual-select");
  };

  return (
    <div className="relative h-screen flex flex-col justify-center bg-primaryColor">
      <video
        key={videoSources[currentVideoIndex]}
        className="absolute top-0 left-0 w-full h-full object-cover z-10 brightness-50"
        autoPlay
        loop
        muted
      >
        <source src={videoSources[currentVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="z-20">
        <UILogo />
      </div>
      <div className="absolute top-0 right-0 m-4 z-20">
        <StyledButton onClick={handleStartClick}>Start</StyledButton>
      </div>
      <div className="flex justify-center px-4 relative z-20">
        <Typography variant="h1">WorkZen</Typography>
      </div>
    </div>
  );
};

export default Header;

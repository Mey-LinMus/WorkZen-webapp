import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import visualsData from "../../visuals.json";
import Typography from "../ui-elements/Typography";
import UILogo from "../ui-elements/Logo";
import StepNavigator from "./StepNavigator";

const VisualSelect = () => {
  const visuals = visualsData.visuals;
  const navigate = useNavigate();

  useEffect(() => {
    // This ensures that the video elements are correctly muted to allow autoplay on mobile devices
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.muted = true;
      video.play();
    });
  }, []);

  const handleVisualClick = (visual) => {
    localStorage.setItem("selectedVisual", JSON.stringify(visual));
    navigate("/music-select");
  };

  return (
    <div className="bg-primaryColor min-h-screen flex flex-col items-center">
      <UILogo />
      <div className="mt-14 mb-12 relative text-center">
        <Typography variant="h2" className="text-center">
          Selecteer een visual
        </Typography>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
        {visuals.map((visual) => (
          <button
            key={visual.id}
            className="relative overflow-hidden rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            style={{
              aspectRatio: "1/1",
              minWidth: "200px",
              maxWidth: "300px",
              width: "100%",
            }}
            onClick={() => handleVisualClick(visual)}
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={visual.video}
              type="video/mp4"
              autoPlay
              loop
              muted
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </button>
        ))}
      </div>

      <StepNavigator />
    </div>
  );
};

export default VisualSelect;

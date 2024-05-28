import React from "react";
// import { useNavigate } from "react-router-dom";
import visualsData from "../../visuals.json";
import Typography from "../ui-elements/Typography";
import UILogo from "../ui-elements/Logo";

const VisualSelect = () => {
  const visuals = visualsData.visuals;
  // const navigate = useNavigate();

  const handleVisualClick = (visual) => {
    localStorage.setItem("selectedVisual", JSON.stringify(visual));
    // navigate("/music-select");
  };

  return (
    <div className="bg-primaryColor h-screen flex flex-col items-center">
      <UILogo />
      <div className="mt-14 mb-12 relative translate-y-10">
        <Typography variant="h2" className="text-center">
          Selecteer een visual
        </Typography>
      </div>
      <div className="grid grid-cols-2 gap-4 justify-center relative translate-y-10 ">
        {visuals.map((visual) => (
          <button
            key={visual.id}
            className="relative overflow-hidden rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            style={{ aspectRatio: "1/1", minWidth: "200px" }}
            onClick={() => handleVisualClick(visual)}
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={visual.video}
              type="video/mp4"
              autoPlay
              loop
              muted
            >
              Your browser does not support the video tag.
            </video>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VisualSelect;

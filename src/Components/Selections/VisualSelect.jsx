import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import visualsData from "../../visuals.json";
import Typography from "../ui-elements/Typography";
import UILogo from "../ui-elements/Logo";


const VisualSelect = () => {
  const visuals = visualsData.visuals;
  const navigate = useNavigate();
  const [selectedVisual, setSelectedVisual] = useState(null);

  useEffect(() => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.muted = true;
      video.play();
    });
  }, []);

  const handleVisualClick = (visual) => {
    setSelectedVisual(visual);
  };

  const handleNextClick = () => {
    if (selectedVisual) {
      localStorage.setItem("selectedVisual", JSON.stringify(selectedVisual));
      navigate("/make-choice");
    } else {
      alert("Please select a visual first.");
    }
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
            className={`relative overflow-hidden rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none ${
              selectedVisual === visual ? "ring-2 ring-blue-500" : ""
            }`}
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

      {/* <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleNextClick}
      >
        Next
      </button> */}
    </div>
  );
};

export default VisualSelect;

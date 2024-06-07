import React, { useEffect, useState } from "react";
import visualsData from "../../visuals.json";
import Typography from "../ui-elements/Typography";
import StyledButton from "../ui-elements/Button";

const VisualChange = ({ onClose, onVisualChange }) => {
  const visuals = visualsData.visuals;
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

  const handleApplyClick = () => {
    if (selectedVisual) {
      onVisualChange(selectedVisual);
      onClose();
    } else {
      alert("Please select a visual first.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primaryColor bg-opacity-50 z-50">
      <div className="bg-primaryColor p-8 rounded-lg max-w-3xl w-full text-center ">
        <Typography variant="h2" className="text-center ">
          Change Visual
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center mt-12 ">
          {visuals.map((visual) => (
            <button
              key={visual.id}
              className={`relative overflow-hidden rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none ${
                selectedVisual === visual
                  ? "active:border-8 focus:ring focus:ring-violet-300 scale-110"
                  : ""
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
        <div className="mt-8 flex justify-end space-x-4">
          <StyledButton onClick={onClose}>Cancel</StyledButton>
          <StyledButton onClick={handleApplyClick}>Apply</StyledButton>
        </div>
      </div>
    </div>
  );
};

export default VisualChange;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import visualsData from "../../Data/visuals.json";
import Typography from "../ui-elements/Typography";
import UILogo from "../ui-elements/Logo";
import StyledButton from "../ui-elements/Button";
import { HiArrowRight } from "react-icons/hi";

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

  const handleClickLogo = () => {
    navigate("/");
    console.log("clickLogo");
  };

  return (
    <div className="bg-gradient-to-b from-custom-gradient-start via-custom-gradient-middle to-custom-gradient-end min-h-screen flex flex-col items-center">
      <div className="z-10">
        <div onClick={handleClickLogo} className="cursor-pointer">
          <UILogo />
        </div>

        <div className="mt-14 mb-12 relative text-center z-10">
          <Typography variant="h2" className="text-center">
            Selecteer een visual
          </Typography>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-4 sm:grid justify-items-center">
          {visuals.map((visual) => (
            <button
              key={visual.id}
              className={`relative overflow-hidden rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none ${
                selectedVisual === visual
                  ? "active:border-8 focus:ring focus:ring-violet-300 scale-110"
                  : ""
              } ${
                selectedVisual === visual
                  ? "w-full sm:w-1/2 md:w-1/3"
                  : "w-full sm:w-1/2 md:w-1/3 sm:max-w-sm md:max-w-md"
              }`}
              style={{
                aspectRatio: "1/1",
                minWidth: "100px",
                maxWidth: "140px",
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

        <div className="mt-16 py-2 flex justify-center space-x-12 items-center ml-32">
          <div>
            <p className="text-neutralColor">1/3</p>
          </div>
          <StyledButton selected onClick={handleNextClick}>
            <HiArrowRight />
          </StyledButton>
        </div>
      </div>
      {selectedVisual && (
        <video
          className="fixed inset-0 w-full h-full object-cover z-0 brightness-50"
          src={selectedVisual.videoLarge}
          type="video/mp4"
          autoPlay
          loop
          muted
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VisualSelect;

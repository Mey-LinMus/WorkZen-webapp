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
    <div className="bg-gradient-to-b from-custom-gradient-start via-custom-gradient-middle to-custom-gradient-end min-h-screen flex flex-col items-center justify-center">
      <div className="z-10 flex flex-col items-center justify-center  my-6">
        <div
          onClick={handleClickLogo}
          className="cursor-pointer md:block hidden mb-4"
        >
          <UILogo />
        </div>

        <div className="mb-12 relative text-center z-10">
          <Typography
            variant="h2"
            className="text-center text-2xl md:text-3xl lg:text-4xl"
          >
            Selecteer een visual
          </Typography>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 justify-items-center w-full ">
          {visuals.map((visual) => (
            <button
              key={visual.id}
              className={`relative overflow-hidden rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none md:h-full md:w-36 md:${
                selectedVisual === visual
                  ? "active:border-8 focus:ring focus:ring-violet-300 "
                  : ""
              } ${
                selectedVisual === visual
                  ? "md:w-32"
                  : "w-full sm:w-1/2  sm:max-w-sm md:max-w-lg"
              } aspect-square min-w-[100px] max-w-[140px]`}
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

        <div className="relative mt-16 flex items-center w-full">
          <div className="flex-grow flex justify-center">
            <p className="text-neutralColor mr-12">Stap 1 / 3</p>
          </div>
          <div className="absolute right-0 pr-4 md:pr-12">
            <StyledButton selected onClick={handleNextClick}>
              <HiArrowRight />
            </StyledButton>
          </div>
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

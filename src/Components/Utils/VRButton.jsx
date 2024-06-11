import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVrCardboard } from "@fortawesome/free-solid-svg-icons";

const VRButton = ({ sceneManager }) => {
  const [isStereo, setIsStereo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
    setIsMobile(isMobileDevice);
  }, []);

  const toggleVR = () => {
    if (!isStereo && isMobile) {
      sceneManager.enableStereoEffect();
      setIsStereo(true);
      sceneManager.requestPermission(); 
    } else if (isStereo) {
      sceneManager.disableStereoEffect();
      setIsStereo(false);
    }
  };

  return (
    <button
      id="vr-toggle"
      onClick={toggleVR}
      disabled={!isMobile}
      title={!isMobile ? "VR is not supported on this device" : ""}
      className={`fixed top-2 right-2 z-50 px-4 py-2 text-base font-medium rounded-md cursor-pointer ${
        isStereo ? "bg-green-500 text-white" : "bg-red-500 text-white"
      } ${!isMobile ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <FontAwesomeIcon icon={faVrCardboard} />
    </button>
  );
};

export default VRButton;

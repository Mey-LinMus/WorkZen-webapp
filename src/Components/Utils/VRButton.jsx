import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVrCardboard } from "@fortawesome/free-solid-svg-icons";

const VRButton = ({ sceneManager }) => {
  const [isStereo, setIsStereo] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isDesktopDevice = /Win|Mac|Linux/i.test(userAgent);
    setIsDesktop(isDesktopDevice);
  }, []);

  const toggleVR = () => {
    if (!isStereo && !isDesktop) {
      sceneManager.enableStereoEffect();
      setIsStereo(true);
    } else if (isStereo) {
      sceneManager.disableStereoEffect();
      setIsStereo(false);
    }
    sceneManager.requestPermission();
  };

  return (
    <button
      id="vr-toggle"
      onClick={toggleVR}
      disabled={isDesktop}
      title={isDesktop ? "VR is not supported on this device" : ""}
      className={`fixed top-2 right-2 z-50 px-4 py-2 text-base font-medium rounded-md cursor-pointer ${
        isStereo ? "bg-green-500 text-white" : "bg-red-500 text-white"
      } ${isDesktop ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <FontAwesomeIcon icon={faVrCardboard} />
    </button>
  );
};

export default VRButton;

import React, { useState } from "react";

const VRButton = ({ sceneManager }) => {
  const [isStereo, setIsStereo] = useState(false);

  const toggleVR = () => {
    if (!isStereo) {
      sceneManager.enableStereoEffect();
      setIsStereo(true);
    } else {
      sceneManager.disableStereoEffect();
      setIsStereo(false);
    }
    sceneManager.requestPermission();
  };

  return (
    <button
      id="vr-toggle"
      onClick={toggleVR}
      className={`fixed top-2 right-2 z-50 px-4 py-2 text-base font-medium rounded-md cursor-pointer ${
        isStereo ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      {isStereo ? "VR On" : "VR Off"}
    </button>
  );
};

export default VRButton;

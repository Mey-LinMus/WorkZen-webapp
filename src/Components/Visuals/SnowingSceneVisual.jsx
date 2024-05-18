import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import ThreeClassSceneManager from "../Utils/ThreeClassSceneManager";
import DeviceOrientationManager from "../Utils/DeviceOrientationManager";

const SnowingScene = () => {
  const containerRef = useRef(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);

  useEffect(() => {
    const sceneManager = new ThreeClassSceneManager(containerRef, THREE);
    const scene = sceneManager.getScene();
    const camera = sceneManager.getCamera();
    const renderer = sceneManager.getRenderer();

    setScene(scene);
    setCamera(camera);
    setRenderer(renderer);

    return () => {
      // Clean up Three.js resources if needed
    };
  }, []);

  useEffect(() => {
    const disableScroll = (event) => {
      event.preventDefault();
    };

    // Disable scroll on mount
    if (document.body) {
      document.body.style.overflow = "hidden";
      document.body.addEventListener("scroll", disableScroll);
    }

    // Re-enable scroll on unmount
    return () => {
      if (document.body) {
        document.body.style.overflow = "auto";
        document.body.removeEventListener("scroll", disableScroll);
      }
    };
  }, []);

  return (
    <>
      <div ref={containerRef} />
      {scene && camera && renderer && (
        <DeviceOrientationManager
          camera={camera}
          renderer={renderer}
          scene={scene}
        />
      )}
    </>
  );
};

export default SnowingScene;

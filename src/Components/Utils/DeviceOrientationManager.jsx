import { useEffect } from "react";

const DeviceOrientationManager = ({
  camera,
  renderer,
  scene,
}) => {
  useEffect(() => {
 

    const handleDeviceOrientation = (event) => {
      const { alpha, beta, gamma } = event;

      camera.rotation.x = (beta * Math.PI) / 180; // Convert degrees to radians
      camera.rotation.y = (gamma * Math.PI) / 180;
      camera.rotation.z = (alpha * Math.PI) / 180;

      renderer.render(scene, camera);
    };

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [camera, renderer, scene]);

  return null;
};

export default DeviceOrientationManager;

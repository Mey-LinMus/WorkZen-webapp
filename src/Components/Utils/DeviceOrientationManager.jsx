import { useEffect } from "react";

const DeviceOrientationManager = ({
  camera,
  renderer,
  scene,
  onPermissionGranted,
}) => {
  useEffect(() => {
    return () => {
      // Cleanup logic
    };
  }, [camera, renderer, scene, onPermissionGranted]);

  return null;
};

export default DeviceOrientationManager;

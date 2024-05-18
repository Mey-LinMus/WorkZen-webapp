import { useEffect } from "react";

const DeviceOrientationManager = ({
  camera,
  renderer,
  scene,
  onPermissionGranted,
}) => {
  useEffect(() => {
    const requestPermission = () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        DeviceOrientationEvent.requestPermission()
          .then((response) => {
            if (response === "granted") {
              onPermissionGranted(); 
              window.addEventListener(
                "deviceorientation",
                handleDeviceOrientation
              );
            }
          })
          .catch(console.error);
      } else {
        alert("DeviceOrientationEvent is not defined");
      }
    };

    const handleDeviceOrientation = (event) => {
      const { alpha, beta, gamma } = event;

      camera.rotation.x = (beta * Math.PI) / 180; 
      camera.rotation.y = (gamma * Math.PI) / 180;
      camera.rotation.z = (alpha * Math.PI) / 180;

      renderer.render(scene, camera);
    };

    const btn = document.getElementById("request");
    btn.addEventListener("click", requestPermission);

    requestPermission();

    return () => {
      btn.removeEventListener("click", requestPermission);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [camera, renderer, scene, onPermissionGranted]);

  return null;
};

export default DeviceOrientationManager;

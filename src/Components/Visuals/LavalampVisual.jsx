import React, { useRef, useEffect, useState } from "react";
import ThreeClassSceneManager from "../Utils/ThreeClassSceneManager";
import VRButton from "../Utils/VRButton";
import * as THREE from "three";

const LavaLamp = () => {
  const containerRef = useRef(null);
  const [sceneManager, setSceneManager] = useState(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);

  useEffect(() => {
    const sceneManager = new ThreeClassSceneManager(containerRef, THREE);
    const scene = sceneManager.getScene();
    const camera = sceneManager.getCamera();
    const renderer = sceneManager.getRenderer();

    const init = () => {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffa000, 1);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      camera.position.set(0, 0, 15);

      const vertexShader = `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normal;
          vec3 transformed = position;
          float noise = sin(position.x * 3.0 + time) * cos(position.y * 3.0 + time);
          transformed.z += noise * 0.5;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
        }
      `;

      const fragmentShader = `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          float r = abs(sin(time + vUv.x * 2.0));
          float g = abs(sin(time + vUv.y * 2.0));
          float b = abs(sin(time + vUv.x * 2.0 + vUv.y * 2.0));
          gl_FragColor = vec4(r, g, b, 1.0);
        }
      `;

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 1.0 },
        },
        vertexShader,
        fragmentShader,
      });

      const numSpheres = 50;
      const spheres = [];

      const spreadRange = 50; 

      for (let i = 0; i < numSpheres; i++) {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const sphere = new THREE.Mesh(geometry, material);

        sphere.position.set(
          Math.random() * spreadRange - spreadRange / 2,
          Math.random() * spreadRange - spreadRange / 2,
          Math.random() * spreadRange - spreadRange / 2
        );

        const scale = Math.random() * 3 + 1;
        sphere.scale.set(scale, scale, scale);

        scene.add(sphere);
        spheres.push(sphere);
      }

      const animate = () => {
        requestAnimationFrame(animate);

        material.uniforms.time.value += 0.01;

        sceneManager.render();
      };

      animate();
    };

    setScene(scene);
    setCamera(camera);
    setRenderer(renderer);
    setSceneManager(sceneManager);

    init();

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      sceneManager.effect.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (renderer && renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      {sceneManager && <VRButton sceneManager={sceneManager} />}
      <div ref={containerRef} />
    </>
  );
};

export default LavaLamp;

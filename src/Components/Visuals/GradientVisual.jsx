import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import ThreeClassSceneManager from "../Utils/ThreeClassSceneManager";
import VRButton from "../Utils/VRButton";

const GradientVisual = () => {
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

      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
      uniform float time;
      varying vec2 vUv;
    
      float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
      }
      
      void main() {
        vec3 color1 = vec3(0.3, 0.5, 0.8);
        vec3 color2 = vec3(0.6, 0.8, 1.0);
        vec3 color3 = vec3(0.7, 0.8, 1.0);
        vec3 color4 = vec3(0.8, 0.9, 0.85);
        vec3 color5 = vec3(0.8, 0.7, 0.9);
    
        float gradient = (sin(time + vUv.y * 3.14159) + 1.0) / 2.0;
    
        vec3 color;
        if (gradient < 0.2) {
            color = mix(color1, color2, gradient * 5.0);
        } else if (gradient < 0.4) {
            color = mix(color2, color3, (gradient - 0.2) * 5.0);
        } else if (gradient < 0.6) {
            color = mix(color3, color4, (gradient - 0.4) * 5.0);
        } else if (gradient < 0.8) {
            color = mix(color4, color5, (gradient - 0.6) * 5.0);
        } else {
            color = mix(color5, color1, (gradient - 0.8) * 5.0);
        }
    
        // Add noise in x and y directions
        float noiseX = rand(vUv + vec2(time, 0.0)) * 0.02;  // Adjust scale factor for noise in x direction
        float noiseY = rand(vUv + vec2(0.0, time)) * 0.02;  // Adjust scale factor for noise in y direction
        color += vec3(noiseX, noiseY, 0.0);
    
        gl_FragColor = vec4(color, 1.0);
      }
    `;

      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0.0 },
        },
        vertexShader,
        fragmentShader,
        side: THREE.BackSide,
      });

      const sphereGeometry = new THREE.SphereGeometry(100, 32, 32);
      const sphere = new THREE.Mesh(sphereGeometry, shaderMaterial);
      scene.add(sphere);

      camera.position.set(0, 1, 0);
      camera.rotation.y = Math.PI;

      const animate = () => {
        requestAnimationFrame(animate);

        shaderMaterial.uniforms.time.value += 0.006;

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
      containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      {sceneManager && <VRButton sceneManager={sceneManager} />}
      <div ref={containerRef} />
    </>
  );
};

export default GradientVisual;

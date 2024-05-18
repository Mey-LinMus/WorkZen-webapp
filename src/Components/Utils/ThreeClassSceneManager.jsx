import { StereoEffect } from "three/examples/jsm/effects/StereoEffect.js";

class ThreeClassSceneManager {
  constructor(containerRef, THREEInstance) {
    this.THREE = THREEInstance;
    this.containerRef = containerRef;
    this.mouseX = 0;
    this.mouseY = 0;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.effect = null;

    this.init();
    this.setupEventListeners();
  }

  init() {
    const container = this.containerRef.current;
    this.camera = new this.THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      100000
    );
    this.camera.position.z = 3200;
    this.scene = new this.THREE.Scene();
    this.renderer = new this.THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);
    this.effect = new StereoEffect(this.renderer);
    this.effect.setSize(window.innerWidth, window.innerHeight);
  }

  setupEventListeners() {
    window.addEventListener("resize", this.onWindowResize.bind(this));
    document.addEventListener("mousemove", this.onDocumentMouseMove.bind(this));
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.effect.setSize(window.innerWidth, window.innerHeight);
  }

  onDocumentMouseMove(event) {
    this.mouseX = (event.clientX - window.innerWidth / 2) * 10;
    this.mouseY = (event.clientY - window.innerHeight / 2) * 10;
  }

  getCamera() {
    return this.camera;
  }

  getScene() {
    return this.scene;
  }

  getRenderer() {
    return this.renderer;
  }

  getEffect() {
    return this.effect;
  }
}

export default ThreeClassSceneManager;

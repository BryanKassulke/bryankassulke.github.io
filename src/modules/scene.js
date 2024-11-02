import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const clock = new THREE.Clock();

export const scene = new THREE.Scene();

/* Light */
export const light = new THREE.DirectionalLight(0xffffff, 3);
export const otherLight = new THREE.PointLight(0xffffff, 4, 100, 0.2);
otherLight.position.set(0, 3, 0);
scene.add(otherLight);

const cameraHelper = new THREE.CameraHelper(otherLight.shadow.camera);
scene.add(cameraHelper);
/* Camera */

const aspect = window.innerWidth / window.innerHeight;
const d = 2;
export const camera = new THREE.OrthographicCamera(
  -d * aspect,
  d * aspect,
  d,
  -d
);
camera.position.set(30, 20, 30);
camera.lookAt(scene.position);

/* Renderer */

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* Orbit Controls */

export const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.mouseButtons = {
  LEFT: THREE.MOUSE.PAN,
  MIDDLE: null,
  RIGHT: THREE.MOUSE.ROTATE,
};
orbitControls.touches = {
  ONE: THREE.TOUCH.PAN,
  TWO: THREE.TOUCH.DOLLY_PAN,
};
orbitControls.zoomSpeed = 3;
orbitControls.maxZoom = 2;
orbitControls.minZoom = 0.15;
orbitControls.enableRotate = false;
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.2;

orbitControls.listenToKeyEvents(window);

/* Attach listeners */

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  const aspect = window.innerWidth / window.innerHeight;
  camera.left = -d * aspect;
  camera.right = d * aspect;
  camera.updateProjectionMatrix();
});

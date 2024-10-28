import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import generateRoom from "./generators/room";

const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const d = 2;
const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d);
camera.position.set(20, 15, 20);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const roomScale = new THREE.Vector3(6.5, 2, 3);
const tileSize = 0.5;

generateRoom(scene, new THREE.Vector3(0, 0, 0), roomScale, tileSize);

scene.add(
  new THREE.Mesh(
    new THREE.SphereGeometry(0.01),
    new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: false,
    })
  )
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.mouseButtons = {
  LEFT: THREE.MOUSE.PAN,
  MIDDLE: null,
  RIGHT: THREE.MOUSE.ROTATE,
};
controls.zoomSpeed = 3;
controls.maxZoom = 2;
controls.minZoom = 0.15;
controls.enableRotate = false;
controls.enableDamping = true;
controls.dampingFactor = 0.2;

function animate() {
  controls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

/* Attach listeners */

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  const aspect = window.innerWidth / window.innerHeight;
  camera.left = -d * aspect;
  camera.right = d * aspect;
  camera.updateProjectionMatrix();
});

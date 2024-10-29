import * as THREE from "three";
import { debug, roomPosition, roomTileSize } from "./modules/constants";
import { scene, camera, orbitControls, renderer, clock } from "./modules/scene";
import { StateMachine } from "./modules/state-machine";
import IntroState from "./modules/states/intro-state";
import SceneState from "./modules/states/scene-state";

if (debug) {
  const axisHelper = new THREE.AxesHelper(10);
  axisHelper.position.set(
    roomPosition.x - roomTileSize / 2,
    roomPosition.y,
    roomPosition.z - roomTileSize / 2
  );
  scene.add(axisHelper);
}

const gameStateMachine = new StateMachine();
const introState = new IntroState();
const sceneState = new SceneState();
gameStateMachine.addTransition(
  introState,
  sceneState,
  () => clock.getElapsedTime() > 5
);
gameStateMachine.setState(introState);

function animate() {
  gameStateMachine.update();
  orbitControls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

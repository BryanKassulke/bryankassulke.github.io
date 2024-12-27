import * as THREE from "three";
import { debug, roomPosition, roomTileSize } from "./modules/constants.js";
import { scene, camera, orbitControls, renderer, clock } from "./modules/scene.js";
import { StateMachine } from "./modules/state-machine.js";
import LoadState from "./modules/states/load-state.js";
import SceneState from "./modules/states/scene-state.js";

import sceneUrl from "./assets/scene.glb";

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
const loadState = new LoadState([sceneUrl]);
const sceneState = new SceneState();
gameStateMachine.addTransition(
  loadState,
  sceneState,
  loadState.isComplete
);
gameStateMachine.setState(loadState);

function animate() {
  gameStateMachine.update();
  orbitControls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

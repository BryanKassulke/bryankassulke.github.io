import * as THREE from "three";
import {
  debug,
  roomScale,
  roomPosition,
  roomTileSize,
  roomFloorThickness,
} from "./constants";

const roomStart = roomPosition.clone();
const roomEnd = roomPosition.clone().add(roomScale);

/** @type {THREE.Mesh[]} */
export const floor = [];

for (let i = roomStart.x; i <= roomEnd.x; i += roomTileSize) {
  for (let j = roomStart.z; j <= roomEnd.z; j += roomTileSize) {
    const tile = new THREE.Mesh(
      new THREE.BoxGeometry(roomTileSize, roomFloorThickness, roomTileSize),
      new THREE.MeshBasicMaterial({
        color: 0x907060,
        wireframe: false,
      })
    );
    tile.position.set(i, 0 - roomFloorThickness / 2, j);
    floor.push(tile);
  }
}

/** @type {THREE.Mesh[]} */
export const leftWall = [];

for (let i = roomStart.z; i <= roomEnd.z; i += roomTileSize) {
  for (let j = roomStart.y; j <= roomEnd.y; j += roomTileSize) {
    const tile = new THREE.Mesh(
      new THREE.PlaneGeometry(roomTileSize, roomTileSize),
      new THREE.MeshBasicMaterial({
        color: 0xb0b0a0,
        wireframe: false,
      })
    );
    tile.position.set(roomStart.x - roomTileSize / 2, j + roomTileSize / 2, i);
    tile.rotation.y = Math.PI / 2;
    leftWall.push(tile);
  }
}

/** @type {THREE.Mesh[]} */
export const rightWall = [];

for (let i = roomStart.x; i <= roomEnd.x; i += roomTileSize) {
  for (let j = roomStart.y; j <= roomEnd.y; j += roomTileSize) {
    const tile = new THREE.Mesh(
      new THREE.PlaneGeometry(roomTileSize, roomTileSize),
      new THREE.MeshBasicMaterial({
        color: 0xb0b0a0,
        wireframe: false,
      })
    );
    tile.position.set(i, j + roomTileSize / 2, roomStart.z - roomTileSize / 2);
    rightWall.push(tile);
  }
}

/** @type {THREE.Mesh[]} */
export const windows = [];
const windowSize = new THREE.Vector3(1.25, 1.5, 0.025);
const windowDistanceFromWall = 1.25;
for (let i = 0; i <= 1; i++) {
  const window = new THREE.Mesh(
    new THREE.BoxGeometry(...windowSize),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: false,
    })
  );
  window.position.y = roomStart.y + 1.25;
  window.position.z = roomStart.z - roomTileSize / 2 + windowSize.z / 2;
  windows.push(window);
}
windows[0].position.x =
  roomStart.x - roomTileSize / 2 + windowSize.x / 2 + windowDistanceFromWall;
windows[1].position.x =
  roomEnd.x + roomTileSize / 2 - windowSize.x / 2 - windowDistanceFromWall;

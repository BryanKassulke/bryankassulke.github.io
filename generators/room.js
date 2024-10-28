import * as THREE from "three";

/**
 * Generate a room with a floor, a right wall and a left wall.
 * @param {THREE.Scene} scene The scene to add the room to.
 * @param {THREE.Vector3} position The position of the room.
 * @param {THREE.Vector3} dimensions The dimensions of the room.
 * @param {number} tileSize The size of the tiles.
 */
export default (scene, position, dimensions, tileSize) => {
  const middle = dimensions.clone().multiplyScalar(0.5).setY(0);

  const floor = [];
  const floorThickness = 0.05;
  for (let i = 0; i <= dimensions.x; i += tileSize) {
    for (let j = 0; j <= dimensions.z; j += tileSize) {
      const tile = new THREE.Mesh(
        new THREE.BoxGeometry(tileSize, floorThickness, tileSize),
        new THREE.MeshBasicMaterial({
          color: 0x907060,
          wireframe: false,
        })
      );

      tile.position.set(
        i - middle.x,
        0 - middle.y - floorThickness / 2,
        j - middle.z
      );
      tile.position.add(position);
      floor.push(tile);
    }
  }

  const rightWall = [];
  for (let i = 0; i <= dimensions.x; i += tileSize) {
    for (let j = 0; j <= dimensions.y; j += tileSize) {
      const tile = new THREE.Mesh(
        new THREE.PlaneGeometry(tileSize, tileSize),
        new THREE.MeshBasicMaterial({
          color: 0xb0b0a0,
          wireframe: false,
        })
      );
      tile.position.set(
        i - middle.x,
        j - middle.y + tileSize / 2,
        0 - middle.z - tileSize / 2
      );
      tile.position.add(position);
      rightWall.push(tile);
    }
  }

  const leftWall = [];
  for (let i = 0; i <= dimensions.z; i += tileSize) {
    for (let j = 0; j <= dimensions.y; j += tileSize) {
      const tile = new THREE.Mesh(
        new THREE.PlaneGeometry(tileSize, tileSize),
        new THREE.MeshBasicMaterial({
          color: 0xb0b0a0,
          wireframe: false,
        })
      );
      tile.position.set(
        0 - middle.x - tileSize / 2,
        j - middle.y + tileSize / 2,
        i - middle.z
      );
      tile.position.add(position);
      tile.rotation.y = Math.PI / 2;
      leftWall.push(tile);
    }
  }

  scene.add(...floor, ...leftWall, ...rightWall);
};

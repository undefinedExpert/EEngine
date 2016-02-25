/**
 * This file has been created by Emanuel Slotwinski on 2016-02-25
 */
/**
  * @desc Placing camera into scene
  * @function camera
 * @param {object} position - set initial position of the camera
 * @param {number} fov - camera Field of View value
  * @return bool - camera object
 */

function camera(position = {x: 0, y: 0, z: 0}, fov = 35) {
  camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 3000);

  //Setting camera position
  camera.position.set(position.x, position.y, position.z);

  return camera;
}
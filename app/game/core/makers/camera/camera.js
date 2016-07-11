import THREE from 'three'; // 3D library

/**
  * @desc Placing camera into scene
  * @function camera
 * @param {object} position - set initial position of the camera
 * @param {number} fov - camera Field of View value
  * @return bool - camera object
 */
class Camera {
  constructor() {}
  /**
     * @desc Creating Three.js Camera
     * @function create()
     * @return new Three.js camera
   */
  create(position = {x: 0, y: 0, z: 0}, fov = 35, cameraNear=0.1, cameraFar=3000) {
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, cameraNear, cameraFar);
    camera.position.set(position.x, position.y, position.z);
    return camera;
  }
}

let camera = new Camera();

export default camera;

import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library
/**
   * @desc Placing light object into application
   * @class Light
 */
class Light {

  constructor() {}

  /**
     * @desc Creating Three.js light
     * @function create()
     * @return new Three.js light
     * //TODO: Adding more lights
   */
  create() {
    light = new THREE.DirectionalLight(0xffeedd);
    return light;
  }

}

let light = new Light();

export default light;



import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library
/**
   * @desc Placing scene object into application
   * @function scene()
 */
class Light {

  constructor() {}

  /**
     * @desc Creating Three.js scene
     * @function create()
   * @return new Three.js scene
   */
  create() {
    light = new THREE.DirectionalLight(0xffeedd);
    return light;
  }

}

let light = new Light();

export default light;



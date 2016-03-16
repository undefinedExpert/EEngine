import THREE from 'three'; // 3D library
import CANNON from 'cannon'; // Physics Library
/**
   * @desc Placing scene object into application
   * @function scene()
 */
class Scene {

  constructor() {}

  /**
     * @desc Creating Three.js scene
     * @function create()
     * @return new Three.js scene
   */
  create() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x5081B5, 1000, 50000 );
    return scene;
  }

  /**
     * @desc Adds Meshes to Scene
     * @function create()
     * @param {array} arrayOfElementsToAdd - List of object which are going to be added to scene
     * @param {string} type - Type of element (mesh, phyx)
   */
  add(arrayOfElementsToAdd=[], type='mesh') {
    let lowerCaseType = type.toLowerCase();
    for (var i = 0, len = arrayOfElementsToAdd.length; i < len; i++) {
      //scene.add(arrayOfElementsToAdd[i][lowerCaseType]);
      lowerCaseType === 'mesh' ? scene.add(arrayOfElementsToAdd[i][lowerCaseType]) : scene.add(arrayOfElementsToAdd[i]);
    }
  }

}

let scene = new Scene();

export default scene;

//export default scene;
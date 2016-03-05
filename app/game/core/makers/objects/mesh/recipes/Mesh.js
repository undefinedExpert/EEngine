import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library
import helpers from './../../../collectors/helpers';
/**
 * @desc Mesh Class is used to build up custom mesh from Three.js
 * @class MeshRecipe
 */
class MeshRecipe {

  /**
   * @desc Constructor which is used (invoked) in ../mesh.js file
   */
  constructor(type = 'basic', geometry, material, phyxType='Body') {
    this.type = helpers.toTitleCase(type);
    this.geometry = geometry;
    this.material = material;
    this.phyxType = phyxType;
  }

  /**
   * @desc builds a mesh From THREE js specific class
   * @return crafted mesh
   * @requires THREE - requires Three.js dependencies
   */
  craft() {
    let mesh = new THREE.Mesh(this.geometry, this.material);
    return mesh;
  }

}

export default MeshRecipe;



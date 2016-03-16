import THREE from 'three'; // 3D library
import CANNON from 'cannon'; // Physics Library
import helpers from './../../../collectors/helpers';
/**
 * @desc Material Class is used to build up custom material from Three.js
 * @class MaterialRecipe
 */
class MaterialRecipe {

  /**
   * @desc Constructor which is used (invoked) in ../material.js file
   * @param {string} type - Type of selected material, has to be uppercase
   * @param {object} properties - Set of selected properties
   */
  constructor(type='Basic', properties={color: '0xff0000'}) {
    this.type = helpers.toTitleCase(type);
    this.properties = properties;
  }

  /**
   * @desc builds a material From THREE js specific class
   * @return crafted material
   * @requires THREE - requires Three.js dependencies
   */
  craft() {
    let material = new THREE['Mesh' + this.type + 'Material'](this.properties);
    return material;
  }

}

export default MaterialRecipe;



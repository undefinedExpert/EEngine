/**
 * This file has been created by Emanuel Slotwinski on 2016-03-16
 */
import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library
import helpers from './../../collectors/helpers';
/**
 * @desc Material Class is used to build up custom material from Three.js
 * @class LightRecipe
 */
class LightRecipe {

  /**
   * @desc Constructor which is used (invoked) in ../material.js file
   * @param {string} type - Type of selected material, has to be uppercase
   * @param {object} properties - Set of selected properties
   */
  constructor(type='Spot', properties={color: 0xff0000}) {
    this.type = helpers.toTitleCase(type);
    this.properties = properties;
    //TODO: refactor SpotLight for a scenario where light in SpotLight would be spelled from lowercase, three.js requires to build up a light from big Letter

  }

  /**
   * @desc builds a material From THREE js specific class
   * @return crafted material
   * @requires THREE - requires Three.js dependencies
   */
  craft() {
    let light = new THREE[this.type + 'Light'](this.properties);
    return light;
  }

}

export default LightRecipe;



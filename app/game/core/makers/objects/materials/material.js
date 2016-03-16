import THREE from 'three'; // 3D library
import CANNON from 'cannon'; // Physics Library
import helpers from './../../collectors/helpers';

//Import recipes object from ./recipe file.
import * as recipe from './recipes/recipe' ;

/**
 * @desc Returns material object
 * @class Material
 */
class Material {

  constructor() {}

  /**
   * @desc Request a build function to make material from set properties
   * @param {string} type - Type of the material, default value is 'basic'
   * @param {object} properties - setting for specific material
   * @return fully build material from options
   */
  create(type = 'basic', properties = {}) {
    let fullyBuildedMaterial = this.build(type, properties);
    return fullyBuildedMaterial;
  }

  /**
   * @desc builds a material From MaterialRecipe class
   * @param {string} type - Type of the material, default value is 'basic'
   * @param {object} properties - setting for specific material
   * @return crafted material
   * @requires MaterialRecipe Class - Default class for building materials
   */
  build(type, properties) {
    var obj = new recipe.MaterialRecipe(type, properties);
    var crafted = obj.craft();
    return crafted;
  }

}

//Creates new material Object
let material = new Material();

export default material;
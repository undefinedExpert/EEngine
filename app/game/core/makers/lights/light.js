import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library

//Import recipes object from ./recipe file.
import * as recipe from './recipes/recipe' ;
/**
   * @desc Placing light object into application
   * @class Light
 */
class Light {

  constructor() {}

  /**
   * @desc Creating Three.js light
   * @function create()
   * @param {string} type - Type of created light, for now you should add spot wihout light word
   * @param {string} properties - properties of newly created light
   * @param {function} cb - callback function, it might be used for manipulation on light
   */
  create(type = 'Spot', properties = {color: 0xff0000}, cb = function(){}) {
    this.cb = cb;
    let fullyBuilded = this.build(type, properties);
    return fullyBuilded;
  }
  /**
   * @desc builds a light From LightRecipe class
   * @param {string} type - Type of the light, default value is 'basic'
   * @param {object} properties - setting for specific material
   * @return crafted material
   * @requires MaterialRecipe Class - Default class for building materials
   */
  build(type, properties) {
    var obj = new recipe.LightRecipe(type, properties);
    var crafted = obj.craft();

    this.cb(crafted);
    return crafted;
  }


}

let light = new Light();

export default light;



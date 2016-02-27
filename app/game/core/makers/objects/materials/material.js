import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library
import helpers from './../../collectors/helpers';

import * as recipe from './recipes/recipe' ;

/**
   * @desc Placing light object into application
   * @class Light
   //TODO: Add more material classes
 */
class Material {

  constructor(type='Basic', properties={}) {
    type = helpers.toTitleCase(type);
    this.type = type;
    this.properties = properties;

  }

  create(type='basic', properties={}){

    let material = this[type](type, properties);
    material = material.craft();
    //return selected type of a function
    return material;

  }
  //TODO: All functions uses the same class
  basic(type, properties){
    return new recipe.Material(type, properties);
  }

  depth(type, properties){
    return new recipe.Material(type, properties);
  }

  lambert(type, properties){
    return new recipe.Material(type, properties);
  }

  phong(type, properties){
    return new recipe.Material(type, properties);
  }

}

let material = new Material();

export default material;
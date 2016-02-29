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

  constructor() {}

  create(type='basic', properties={}){


    let typeOfMaterial = this.build(type,properties);

    console.log(typeOfMaterial);

    return typeOfMaterial;

  }
  //TODO: All functions uses the same class

  build(type,properties){
    var obj = new recipe.MaterialRecipe(type,properties);
    var crafted = obj.craft();
    return crafted;
  }


}

let material = new Material();

export default material;
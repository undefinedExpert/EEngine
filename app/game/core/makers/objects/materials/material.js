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
    this.type = type;
    this.properties = properties;


    let typeOfMaterial = this[type](type, properties);


    return typeOfMaterial;

  }
  //TODO: All functions uses the same class
  basic(type, properties){

    return new recipe.MaterialRecipe(this.type, this.properties);
  }

  depth(type, properties){
    return new recipe.MaterialRecipe(this.type, this.properties);
  }

  lambert(type, properties){
    console.log(type, properties);
    console.log(this.type, this.properties);
    let material = new recipe.MaterialRecipe(type, properties);

    let craftedMaterial = material.craft();
    return craftedMaterial;
  }

  phong(type, properties){
    return new recipe.MaterialRecipe(this.type, this.properties);
  }

}

let material = new Material();

export default material;
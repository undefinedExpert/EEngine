import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library
import helpers from './../../collectors/helpers';

import * as recipe from './recipes/recipe' ;

/**
   * @desc Placing light object into application
   * @class Light
 */
class Geometry {

  constructor(supportShapesTypes, type='Box', pickedSize='small') {
    type = helpers.toTitleCase(type);
    this.type = type;
    this.pickedSize = pickedSize;

  }

  create(type, pickedSize){

    let shape = this[type](type, pickedSize);
    shape = shape.craft();
    //return selected type of a function
    return shape;
  }

  cylinder(type, pickedSize){
    return new recipe.Cylinder(type, pickedSize);
  }

  box(type, pickedSize){
    return new recipe.Box(type, pickedSize);
  }

  plane(type, pickedSize){
    return new recipe.Plane(type, pickedSize);
  }

  small() {
    return [];
  }

  low() {
    return [];
  }

}

var supportShapesTypes = ['cylinder', 'box', 'plane'];
let geometry = new Geometry(supportShapesTypes);

export default geometry;
import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library
import helpers from './../../collectors/helpers';

import * as recipe from './recipes/recipe' ;

/**
   * @desc Placing light object into application
   * @class Light
 */
class Geometry {

  constructor(supportShapesTypes, type='Box', size='small') {
    type = helpers.toTitleCase(type);
    this.type = type;
    this.size = size;
  }

  create(type, size){

    let shape = this[type](type, size);


    shape = shape.craft(size);
    //return selected type of a function
    return shape;
  }

  cylinder(type, size){
    return new recipe.Cylinder(type, size);
  }

  box(type, size){
    return new recipe.Box(type, size);
  }

  plane(type, size){
    return new recipe.Plane(type, size);
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

console.log(geometry.create('plane'))

export default geometry;
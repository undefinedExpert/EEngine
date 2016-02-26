import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library
import helpers from './../../collectors/helpers';

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

  create(type){
    console.log(this[type]);

    //return selected type of a function
    return this[type];
  }

  cylinder(){}

  box(){}

  plane(){}


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
import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library
import helpers from './../../../collectors/helpers';
//TODO: Poprawa komentarzy
/**
   * @desc Placing light object into application
   * @class Light
 */
class ShapeRecipe {

  /**
   * @desc Default type of the shape
   * @param {string} type - Type of selected shape
   * @param {string} size - Type of selected size
   */
  constructor(type='Box') {
    var typeCapitalized = helpers.toTitleCase(type);
    this.type = typeCapitalized;
  }

  makes(arg){
    return new THREE[this.type + 'Geometry'](arg);
  }

}

export default ShapeRecipe;



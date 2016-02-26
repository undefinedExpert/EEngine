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
  constructor(type='Box', size='low') {
    var typeCapitalized = helpers.toTitleCase(type);
    this.type = typeCapitalized;
  }
  craft() {
    //trzeba tutaj udostepnic odpowiedni rozmiar
    let shape = new THREE[this.type + 'Geometry'](...this.currentSize);


    return shape;

  }

}

export default ShapeRecipe;



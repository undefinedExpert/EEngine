import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library

import Shape from './Shape'
/**
   * @desc Placing light object into application
   * @class Light
   TODO: Poprawa komentarzy
 */
class PlaneRecipe extends Shape{

  /**
   * @desc Creates box with selected size.
   * @param {string} type - Type of selected shape
   * @param {string} size - Type of selected size
   */
  constructor(type, size) {
    super(type, size)
  }

  medium() {
    return [60, 40, 1, 1];
  }
  small() {
    return [5, 20, 32];
  }

  low() {
    return [25, 25, 8];
  }

  craft(size) {
    let values = this[size];

    return new THREE[this.type + 'Geometry'](60, 40, 1, 1);

  }

}

export default PlaneRecipe;
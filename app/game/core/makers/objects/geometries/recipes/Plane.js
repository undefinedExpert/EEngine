import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library

import ShapeRecipe from './Shape'
/**
   * @desc Placing light object into application
   * @class Light
   TODO: Poprawa komentarzy
 */
class PlaneRecipe extends ShapeRecipe{

  /**
   * @desc Creates box with selected size.
   * @param {string} type - Type of selected shape
   * @param {string} size - Type of selected size
   */
  constructor(type, size='medium') {
    super(type);
    this.currentSize = this[size]();
  }

  huge() {
    //width, height, widthSegments, heightSegments
    return [128, 128, 1, 1];
  }

  medium() {
    //width, height, widthSegments, heightSegments
    return [60, 40, 1, 1];
  }

  small() {
    //width, height, widthSegments, heightSegments
    return [5, 20, 32, 1];
  }

  low() {
    //width, height, widthSegments, heightSegments
    return [25, 25, 8,  1];
  }

}

export default PlaneRecipe;
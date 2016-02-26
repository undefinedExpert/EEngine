import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library

import ShapeRecipe from './Shape'
/**
   * @desc Placing light object into application
   * @class Light
 TODO: Poprawa komentarzy
 */
class BoxRecipe extends ShapeRecipe{

  /**
   * @desc Creates box with selected size.
   * @param {string} type - Type of selected shape
   * @param {string} size - Type of selected size
   */
  constructor(type, size) {
    super(type, size)
  }

  small() {
    //width, height, depth, widthSegments, heightSegments, depthSegments
    return [1, 1, 1, 8, 8, 8];
  }

  low() {
    //width, height, depth, widthSegments, heightSegments, depthSegments
    return [1, 1, 1, 1, 1, 1];
  }

  craft(size) {
    let values = this[size];

    let craftedGeometry = this.makes.apply(this, values);


    return craftedGeometry;

  }


}

export default BoxRecipe;



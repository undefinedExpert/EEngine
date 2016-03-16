import THREE from 'three'; // 3D library
import CANNON from 'cannon'; // Physics Library

import ShapeRecipe from './Shape'

/**
 * @desc PlaneRecipe class contains sets of sizes which are used in geometry creation process
 * @class PlaneRecipe
 * @extends ShapeRecipe
 */
class PlaneRecipe extends ShapeRecipe{

  /**
   * @desc Creates Plane with selected size.
   * @param {string} type - Type of selected shape
   * @param {string} size - Type of selected size
   */
  constructor(type, size='medium') {
    super(type);
    this.currentSize = this[size]();
  }

  /**
   * @desc This function is used to set up specific size of an element
   * @return Array
   * @function huge()
   */
  huge() {
    //width, height, widthSegments, heightSegments
    return [128, 128, 1, 1];
  }

  /**
   * @desc This function is used to set up specific size of an element
   * @return Array
   * @function medium()
   */
  medium() {
    //width, height, widthSegments, heightSegments
    return [60, 40, 1, 1];
  }

  /**
   * @desc This function is used to set up specific size of an element
   * @return Array
   * @function small()
   */
  small() {
    //width, height, widthSegments, heightSegments
    return [5, 20, 32, 1];
  }

  /**
   * @desc This function is used to set up specific size of an element
   * @return Array
   * @function low()
   */
  low() {
    //width, height, widthSegments, heightSegments
    return [25, 25, 8,  1];
  }

}

export default PlaneRecipe;
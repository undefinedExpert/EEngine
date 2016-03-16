import THREE from 'three'; // 3D library
import CANNON from 'cannon'; // Physics Library

import ShapeRecipe from './Shape'

/**
 * @desc BoxRecipe class contains sets of sizes which are used in geometry creation process
 * @class BoxRecipe
 * @extends ShapeRecipe
 */
class BoxRecipe extends ShapeRecipe{

  /**
   * @desc Creates box with selected size.
   * @param {string} type - Type of selected shape
   * @param {string} size - Type of selected size
   */
  constructor(type, size='low') {
    super(type);
    this.currentSize = this[size]();
  }

  /**
   * @desc This function is used to set up specific size of an element
   * @return Array
   * @function huge()
   */
  huge() {
    //width, height, depth, widthSegments, heightSegments, depthSegments
    return [128,128,128, 1, 1, 1];
  }

  /**
   * @desc This function is used to set up specific size of an element
   * @return Array
   * @function medium()
   */
  medium() {
    //width, height, depth, widthSegments, heightSegments, depthSegments
    return [4, 4, 4, 8, 8, 8];
  }

  /**
   * @desc This function is used to set up specific size of an element
   * @return Array
   * @function small()
   */
  small() {
    //width, height, depth, widthSegments, heightSegments, depthSegments
    return [1, 1, 1, 8, 8, 8];
  }

  /**
   * @desc This function is used to set up specific size of an element
   * @return Array
   * @function low()
   */
  low() {
    //width, height, depth, widthSegments, heightSegments, depthSegments
    return [1, 1, 1, 1, 1, 1];
  }

}

export default BoxRecipe;



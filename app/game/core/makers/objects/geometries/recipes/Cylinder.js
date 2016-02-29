import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library

import ShapeRecipe from './Shape'
/**
 * @desc CylinderRecipe class contains sets of sizes which are used in geometry creation process
 * @class CylinderRecipe
 * @extends ShapeRecipe
 */
class CylinderRecipe extends ShapeRecipe{

  /**
   * @desc Creates Cylinder with selected size.
   * @param {string} type - Type of selected shape
   * @param {string} size - selected size pattern
   */
  constructor(type, size='low') {
    super(type);
    this.currentSize = this[size]();
  }

  /**
   * @desc This function is used to set up specific size of an element
   * @return Array
   * @function small()
   */
   small() {
     //radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength
    return [2, 2, 5, 32];
  }

  /**
   * @desc This function is used to set up specific size of an element
   * @return Array
   * @function low()
   */
   low() {
     //radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength
    return [2, 2, 5, 8];
  }


}

export default CylinderRecipe;
import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library

import ShapeRecipe from './Shape'
/**
   * @desc Placing light object into application
   * @class Light
 TODO: Poprawa komentarzy
 */
class CylinderRecipe extends ShapeRecipe{

  /**
   * @desc Creates cylinder with selected size.
   * @param {string} type - Type of selected shape
   * @param {string} size - Type of selected size
   */
  constructor(type, size='low') {
    super(type);

    console.log(size);

    this.currentSize = this[size]();
  }

   small() {
     //radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength
    return [2, 2, 5, 32];
  }

   low() {
     //radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength
    return [2, 2, 5, 8];
  }


}

export default CylinderRecipe;
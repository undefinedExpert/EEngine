import THREE from 'three'; // 3D library
import helpers from './../../../collectors/helpers';

/**
 * @desc ShapeRecipe class is used to buildup a shape from proprieties and return appropriate value
 * @class ShapeRecipe
 */
class ShapeRecipe {

  /**
   * @desc Default type of the shape
   * @param {string} type - Type of selected shape
   * @param {string} size - Type of selected size
   */
  constructor(type='Box', size='low') {
    this.type = helpers.toTitleCase(type);
  }

  /**
   * @desc requests a shape creation process from three.js plugin, ...this.curreuntSize is a
   * variable which contains a custom set array which contains sizes
   * for each specific geometry shape
   * @return fully created shape
   */
  craft() {
    let shape = new THREE[this.type + 'Geometry'](...this.currentSize);

    //Exporting size to make an usage at phyx creation process
    shape.size = this.currentSize;
    return shape;
  }

}

export default ShapeRecipe;



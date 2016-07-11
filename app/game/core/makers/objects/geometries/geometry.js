import helpers from './../../collectors/helpers';
import * as recipe from './recipes/recipe' ;

/**
 * @desc This class is used to build up geometry of three.js mesh
 * @class Geometry
 * @requires helpers, recipe
 */
class Geometry {

  /**
   * @desc
   * @class Geometry
   * @param {string} type - Type of geometry which going to be used in specific recipe class
   * @param {string} pickedSize - Size of that geometrie, sizes of for each specific type can be found under recipes folder
   * @requires helpers, recipe
   */
  constructor(type='Box', pickedSize='small') {
    type = helpers.toTitleCase(type);
    this.type = type;

  }

  /**
   * @desc Request a build function to make shape from set properties
   * @param {string} type - Type of the shape, default value is 'Basic'
   * @param {object} pickedSize - Selected size for upcoming shape, all shape sizes are available under ./recipe/specific_shape.js file
   * @return fully build shape from options
   */
  create(type, pickedSize){
    let shape = this.build(type, pickedSize);
    return shape;
  }

  /**
   * @desc builds a shape From specific shape class, all shapes classes are available under recipes/specific_shape.js file
   * @param {string} type - Type of the material, default value is 'basic'
   * @param {object} pickedSize - setting for size for specific geometry shape
   * @return crafted shape
   * @requires recipe Class - Contains all classes (with specified sizes) of shapes
   * @requires helpers Contains helper function which is used to capitalize first letter
   */
  build(type, pickedSize) {
    type = helpers.toTitleCase(type);
    var obj = new recipe[type](type, pickedSize);
    var crafted = obj.craft();
    return crafted;
  }

}

//Creates new instance of Geometry Class
let geometry = new Geometry();

export default geometry;

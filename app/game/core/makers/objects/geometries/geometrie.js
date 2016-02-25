/**
 * This file has been created by Emanuel Slotwinski on 2016-02-25
 */
/**
   * @desc Returning a shape of geometry which will be used in mesh create function
   * @function geometry
 * @param {string} type - type of currently selected geometry
 * @param {string} pickedSize - the message to be displayed
   * @return object - newly created object
 */
function geometry(type, pickedSize) {
//TODO: znalezienie sposobu na dostarczanie odpowiednich geometrii
//TODO: Dodanie najlepiej w osobnym pliku nowych predefiniowanych proporcji dla roznego rodzaju ksztaltow.
//TODO: Ustawic GETTER/SETTER dla class

  //Base shapes which are used to create correct shape from Classes with apropriate prototypes
  var shapes = {
    "cylinder": function () {
      return new Cylinder(type, pickedSize);
    },
    "box": function () {
      return new Box(type, pickedSize);
    },
    "plane": function(){
      return new Plane(type, pickedSize);
    }
  };

  //Class which represents types of all geometries
  class Type {
    /**
     * @desc Default type of the shape
     * @param {string} type - Type of selected shape
     * @param {string} size - Type of selected size
     */
    constructor(type, size) {
      type = toTitleCase(type);
      this.type = type;
      this.size = size;
    }

    small() {
      return [5, 5, 5, 8];
    }

    low() {
      return [5, 5, 5, 8];
    }

  }

  //Prototype of cylinders
  class Cylinder extends Type {
    /**
     * @desc Creates cylinder with selected size.
     * @param {string} type - Type of selected shape
     * @param {string} size - Type of selected size
     */
    constructor(type, size) {
      super(type, size)
    }

    small() {
      return [2, 2, 5, 32];
    }

    low() {
      return [2, 2, 5, 8];
    }

    craft(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength) {
      return new THREE[this.type + 'Geometry'](radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength);
    }
  }

  class Box extends Type {
    /**
     * @desc Creates box with selected size.
     * @param {string} type - Type of selected shape
     * @param {string} size - Type of selected size
     */
    constructor(type, size) {
      super(type, size)
    }

    small() {
      return [1, 1, 1, 8, 8, 8];
    }

    low() {
      return [1, 1, 1, 1, 1, 1];
    }

    craft(width, height, depth, widthSegments, heightSegments, depthSegments) {
      return new THREE[this.type + 'Geometry'](width, height, depth, widthSegments, heightSegments, depthSegments);

    }
  }

  class Plane extends Type {
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

    craft(width, height, widthSegments, heightSegments) {
      return new THREE[this.type + 'Geometry'](width, height, widthSegments, heightSegments);

    }
  }

  var allSizes = shapes[type](type, pickedSize);

  //If requested type 'size' match any of sizes (name of a function)
  if (allSizes[pickedSize].name === pickedSize) {
    var selected = allSizes[pickedSize]();
  }

  //Making sure that type is spelled capital uppercase (three.js uses Capitalized letters as geometries, cause they are constructors)

  //Cloning special craft method, and adding size arguments for newly created geometry
  let craftedGeometry = allSizes.craft.apply(allSizes, selected);

  //Returning a geometry
  return craftedGeometry;
}
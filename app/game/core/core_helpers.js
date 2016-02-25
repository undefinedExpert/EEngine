/*
 *
 * Ten plik zawiera funkcje ktore sa aktywnie wykorzystywane w naszym pliku core
 * TODO: Rozibice tego pliku na mniejsze czesci
 * */

"use strict";
import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/**
   * @desc Placing scene object into application
   * @function scene()
 */
function scene() {
  return scene = new THREE.Scene();
}

/**
  * @desc Placing camera into scene
  * @function camera
 * @param {object} position - set initial position of the camera
 * @param {number} fov - camera Field of View value
  * @return bool - camera object
 */

function camera(position = {x: 0, y: 0, z: 0}, fov = 35) {
  camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 3000);

  //Setting camera position
  camera.position.set(position.x, position.y, position.z);

  return camera;
}


function light() {
  light = new THREE.DirectionalLight(0xffeedd);

  return light;
}

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


/**
   * @desc Material creator function
   * @function material
 * @param {string} type - type of material
 * @param {object} properties - Proporties of a material
   * @return bool - object
 */
function material(type = 'basic', properties = {wireframe: true}) {
//TODO: Adding more base materials
  //Base materials which are use to create new objects from classes
  var materials = {
    "basic": function () {
      return new Material(type, properties);
    },
    "depth": function () {
      return new Material(type, properties);
    },
    "lambert": function(){
      return new Material(type, properties);
    },
    "phong": function(){
      return new Material(type, properties);
    }
  };

  //Main class
  class Material {
    /**
     * @desc Default constructor of material
     * @param {string} type - Type of selected shape
     * @param {object} properties - Type of selected size
     */
    constructor(type, properties) {
      type = toTitleCase(type);
      this.type = type;
      this.properties = properties;
    }


    craft(properties) {
      //console.log(new THREE['Mesh' + this.type + 'Material']({wireframe: true}));
      //Properties are from Constructor
      return new THREE[['Mesh' + this.type + 'Material']](properties);
    }

  }

  //Setting specific type with properties to materials
  var material = materials[type](type, properties);

  //Creating material
  let craftedMaterial = material.craft.apply(material, [properties]);

  //Returning material
  return craftedMaterial;
}


function mesh(type, object, material, phyxType='Box') {


  var meshes = {
    basic: function () {
      return new Mesh(type, object, material, phyxType);
    }
  };

  class Mesh {
    /**
     * @desc Default constructor of material
     * @param {string} type - Type of selected shape
     * @param {object} properties - Type of selected size
     */
    constructor(type, object, material, phyxType) {
      type = toTitleCase(type);
      this.type = type;
      this.object = object;
      this.material = material;
      this.phyxType = phyxType;

    }


    craft(type, object, material) {
      //console.log(new THREE['Mesh' + this.type + 'Material']({wireframe: true}));
      //Properties are from Constructor
      return new THREE.Mesh(object, material);
    }

    shape() {
      this.shape = new CANNON[phyxType](new CANNON.Vec3(1, 1, 1));

      return this.shape;


    }
    init(name) {
      name = new CANNON.Body({
        mass: 1
      });

      console.log(this.shape());


      name.shape = this.shape();

      name.angularVelocity.set(0, 0, 0);

      name.angularDamping = 0.5;

      return name;
    }

  }


  var mesh = meshes[type](type, object, material, phyxType);
  var craftedMesh = mesh.craft.apply(Mesh, [type, object, material]);

  craftedMesh.construct = {
    shape: function () {
      this.shape = new CANNON[phyxType](new CANNON.Vec3(1, 1, 1));
      return this.shape;
    },
    mass: 1,
    init: function (name) {
      name = new CANNON.Body({
        mass: 1
      });

      name.shape = this.shape();

      name.angularVelocity.set(0, 0, 0);

      name.angularDamping = 0.5;

      return name;
    }

  };

  //Returning material

  return craftedMesh;


}

function addObjects(arrayOfElementsToAdd) {
  for (var i = 0, len = arrayOfElementsToAdd.length; i < len; i++) {
    scene.add(arrayOfElementsToAdd[i].mesh);
  }
}

function render() {
  render = new THREE.WebGLRenderer( { antialias: true } );
  render.setSize(window.innerWidth, window.innerHeight);
  render.shadowMap.enabled = true;
  render.setClearColor(0x5081B5);


  render.shadowMapSoft = true;

  render.shadowCameraNear = 3;
  render.shadowCameraFar = camera.far;
  render.shadowCameraFov = 50;

  render.shadowMapBias = 0.0039;
  render.shadowMapDarkness = 0.5;
  render.shadowMapWidth = 1024;
  render.shadowMapHeight = 1024;


  document.body.appendChild(render.domElement);
  return render;
}

function interaction(button, fn) {
  //Interaction with square button
  button.addEventListener('click', () => {
    fn();
  });

  return button;
}

//var light = {
//  direct: function (color = '', strength = 1) {
//    var returnedLight = {
//      light: this.light,
//      position: function (x, y, z) {
//        console.log(this);
//        this.light.position.set(x, y, z).normalize();
//
//      }
//    };
//
//    returnedLight.light = new THREE.DirectionalLight(0xffffff, strength);
//
//    return returnedLight;
//  },
//  point: function () {
//    throw 'light.point - not implemented yet';
//  },
//  spot: function () {
//    throw 'light.spot - not implemented yet';
//  },
//  maker: function () {
//
//  }
//
//
//};

export {
/**
 * Get the red, green, and blue values of a color.
 * @function
 * @param {string} color - A color, in hexidecimal format.
 * @returns {Array.} An array of the red, green, and blue values,
 * each ranging from 0 to 255.
 */
  light as light,
  scene as scene,
  camera as camera,
  geometry as geometry,
  material as material,
  mesh as mesh,
  addObjects as add,
  render as render,
  interaction as interaction
};

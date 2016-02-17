/*
 *
 * Ten plik zawiera funkcje ktore sa aktywnie wykorzystywane w naszym pliku core
 *
 * */
import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library

// convert color to array of RGB values (0-255)
function log(msg) {
  return console.log(msg);
}

function scene() {
  return scene = new THREE.Scene();
}

function camera() {
  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 100);

  camera.position.z = 15;

  return camera;
}

function light() {
  light = new THREE.DirectionalLight(0xffeedd);

  return light;
}

function geometry() {
  geometry = new THREE.BoxGeometry(2, 2, 2);

  return geometry;
}

function material() {
  material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  });

  return material;
}

function mesh() {
  mesh = new THREE.Mesh(geometry, material);
  mesh.construct = {
    shape: function () {
      this.shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
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
  return mesh;
}

function addObjects(arrayOfElementsToAdd) {
  for (var i = 0, len = arrayOfElementsToAdd.length; i < len; i++) {
    console.log(arrayOfElementsToAdd[i]);
    scene.add(arrayOfElementsToAdd[i]);
  }
}

function render() {
  render = new THREE.WebGLRenderer();

  render.setSize(window.innerWidth, window.innerHeight);

  return render;
}

function interaction(button, fn){
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
  log as log,
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

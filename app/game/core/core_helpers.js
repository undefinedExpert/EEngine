/*
 *
 * Ten plik zawiera funkcje ktore sa aktywnie wykorzystywane w naszym pliku core
 *
 * */
import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library

function toTitleCase(str)
{
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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

function camera(position={x: 0, y: 0, z: 0}, fov=35) {
  camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 10000);

  //Setting camera position
  camera.position.set(position.x,position.y,position.z);

  return camera;
}


function light() {
  light = new THREE.DirectionalLight(0xffeedd);

  return light;
}

function geometry(name, pickedSize) {
//TODO: znalezienie sposobu na dostarczanie odpowiednich geometrii


  var allSizes = {
    cylinder: {
      small: function(){
        return [5, 5, 20, 32];
      }
    }
  };
  if(allSizes[name][pickedSize].name === pickedSize){
    pickedSize = allSizes[name][pickedSize]();
    console.log(pickedSize);


  }




  name = toTitleCase(name);


  function craftGeometry(){

  }
  //Tutaj wykorzystujemy nasza wlasna nazwe jako proporcje THREE, zajebiste rozwiazanie.
  let craftedGeometry = new THREE[name + 'Geometry'];
  console.log(new THREE[name + 'Geometry'].apply(this, [5, 5, 20, 32]));


  return craftedGeometry;

}

function material() {
  material = new THREE.MeshDepthMaterial({
    wireframe: true
  });

  return material;
}

function mesh(cylinder) {
  mesh = new THREE.Mesh(cylinder, material);
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
    scene.add(arrayOfElementsToAdd[i]);
  }
}

function render() {
  render = new THREE.WebGLRenderer();

  render.setSize(window.innerWidth, window.innerHeight);
  render.shadowMap.enabled = true;
  render.setClearColor(0x5081B5);
  document.body.appendChild(render.domElement);
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

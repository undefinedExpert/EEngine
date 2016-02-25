import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library
 /**
     * @desc Placing scene object into application
     * @function scene()
   */


 class Scene {
   constructor(){

   }

   create(){
   return
    }

 }

function scene() {
  return scene = new THREE.Scene();
}

function addObjects(arrayOfElementsToAdd) {
  for (var i = 0, len = arrayOfElementsToAdd.length; i < len; i++) {
    scene.add(arrayOfElementsToAdd[i].mesh);
  }
}
//Exporting single function




let api = {
  scene,
  addObjects
};

export default api;

//export default scene;
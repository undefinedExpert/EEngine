import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library
import * as api from '../../makers/maker';


//
//
//let init = function(scene,CurrentScene,camera, light) {
//  console.log();
//  this.scene = CurrentScene = api.scene.create();
//
//  camera = api.camera.create({x: 0, y: 3, z: 50}, 35);
//
//  light = api.light.create();
//};
///**
// * @method object
// * @desc This method build up fully working mesh from bunch of properties, it also bulds up a physical body for that mesh
// */
//let objectBuilder = function (props){
//  //init materials to build mesh
//  var container = {};
//  //var box = make.geometry(props.geoType, props.geoSize);
//  var geometry = api.geometry.create(props.geoType, props.geoSize);
//
//  //If the physical shape is a Plane then make it rotate (ground)
//
//
//  //Build up a material for upcoming object
//  material = api.material.create(props.materialType, props.materialProps);
//
//  //building up mesh from options
//  props.meshName = api.mesh.create(props.meshType, geometry, material, props.phyxType, props.phyxShapeType, props.phyxBodyTypeParameters, props.position, this.CurrentScene);
//
//  //Dodawanie mecha do proporcji zwrotnych
//  container.mesh = props.meshName;
//  if(props.phyxShapeType === 'Plane'){
//    props.meshName.phyx.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
//  }
//  //Adding phyx to this mesh
//  props.phyxName = props.meshName.phyx; //init phyx for this object
//
//  //Dodawanie phyx do proporcji zwrotnych
//  container.phyx = props.phyxName;
//
//  //return object mesh with phyx
//  return container;
//};
//
///**
// * @method cannon
// * @desc Initialize whole physics for scene and it's objects
// */
//let cannonInitializer = function(){
//  //Todo: refactor
//  world = new CANNON.World();
//  world.gravity.set(0, -10, 0);
//  world.broadphase = new CANNON.NaiveBroadphase();
//  world.solver.iterations = 20;
//  world.quatNormalizeSkip = 0;
//  world.quatNormalizeFast = false;
//  world.defaultContactMaterial.contactEquationStiffness = 1e7;
//  world.defaultContactMaterial.contactEquationRelaxation = 4;
//  world.doProfiling = true;
//
//  var solver = new CANNON.GSSolver();
//  solver.iterations = 7;
//  solver.tolerance = 0.1;
//
//  var split = true;
//  if(split)
//    world.solver = new CANNON.SplitSolver(solver);
//  else
//    world.solver = solver;
//
//  var physicsMaterial = new CANNON.Material("slipperyMaterial");
//  //Tutaj trzeba dodac fizyczne "cialo" na ktorym sie odbywa manipulacja do swiata
//  var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial, physicsMaterial, [0.1, 0.3]);
//  // We must add the contact materials to the world
//  world.addContactMaterial(physicsContactMaterial);
//  world.solver.iterations = 20; // Increase solver iterations (default is 10)
//  world.solver.tolerance = 0;   // Force solver to use all iterations
//
//
//  items.forEach(function(item){
//    //TODO: Naprawic dodawanie fizyki
//    //w kazdym item.phyx world jets null, why
//    world.addBody(item.phyx);
//  });
//
//};


export  {
  init as init
}
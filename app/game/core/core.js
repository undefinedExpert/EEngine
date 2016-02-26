//ten plik bedzie zarzadzal wczytywaniem scen.

"use strict";

import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library
var OrbitControls = require('three-orbit-controls')(THREE);
import config from './config'; // importing config of core module

import * as make from './core_helpers';
import * as api from './makers/maker';
import {GameObjects} from './GameObjectClass';

var camera, scene, renderer;
var NEAR = 10, FAR = 3000;
//Cannon (physic engine)
var  material, light, speedButton, controls;
var world, timeStep = 1 / 60;
var lightPosition4D = new THREE.Vector4();

var mouseX = 0, mouseY = 0;
var windowHalfY, windowHalfX;

var core = {
  /**
   * @method init
   * @desc Init whole scene with assets
   */
  scener: function () {
    let that = this;
    //W tej funkcji bede wczytywal poziomy
    //Oraz dodawal wszystkie elementy potrzebne do importu takiej sceny, obiekty itd.
    //Ta funkcja bedzie wykorzystywana do scalania kazdej sceny.

    //Jakie elementy sa potrzebne do stworzenia sceny?
    //1. dla three.js scena
    //2. Kamera
    //3. Swiatlo
    //4. Obiekty

    //Init all basic functions which are create scene an so
    this.init();

    //TODO: Latwiejsze dodawanie swiatel do widoku
    //TODO: Cienie dla obiektow/swiatel
    //TODO: Dodawanie obiektow z prototypu
    //TODO: Stworzenie obiektu 'grunt' ktory przyjmowal by cienie innych obiektow
    //TODO: Rozbicie tego pliku na mniejsze pliki
    //TODO: Wlaczenie grawitacji dla obiektu 'ground'
    //TODO: Implementacja dzwiekow
    //TODO: Kolekcja obiektow / zbior obiektow ktory wskazuje na obiekt o proporcjach z danego zbioru
    var objectsListToRender = [];


    var objectSet = {
      object1: that.object({
        geoType: 'cylinder',
        geoSize: 'small',
        materialType: 'lambert',
        materialProps: {
          color: 'rgb(255,0,0)', emissive: 0x200000
        },
        meshType: 'basic',
        shadow: 'object1Shadow',
        phyxName: 'objectPhyx',
        phyxBodyType: 'Body',
        phyxBodyTypeParameters: {
          mass: 1
        }
      }),
      object2: that.object({
        geoType: 'box',
        geoSize: 'low',
        materialType: 'lambert',
        materialProps: {
          color: 'rgb(255,0,0)', emissive: 0x200000
        },
        meshType: 'basic',
        meshName: 'object2',
        shadow: 'object2Shadow',
        phyxName: 'object2Phyx',
        phyxBodyType: 'Body',
        phyxBodyTypeParameters: {
          mass: 1
        }
      }),
      plane: that.object({
        geoType: 'plane',
        geoSize: 'low',
        materialType: 'lambert',
        materialProps: {
          color: 0xffffff
        },
        meshType: 'basic',
        meshName: 'plane',
        shadow: 'planeShadow',
        phyxName: 'planePhyx',
        phyxType: 'Plane',
        phyxShapeType: 'Plane',
        phyxBodyType: 'Body',
        phyxBodyTypeParameters: {
          mass: 1
        }

      })

    };

    //grid
    var grid = new THREE.GridHelper(100, 10);
    scene.add(grid);


    // create the ground plane


    objectSet.plane.mesh.receiveShadow = true;
    // rotate and position the plane
    objectSet.plane.mesh.rotation.x = -0.5 * Math.PI;


    objectSet.plane.mesh.position.clone(objectSet.plane.phyx.position);
    objectSet.plane.mesh.quaternion.clone(objectSet.plane.phyx.rotation);




    //Object manipulations
    objectSet.object2.phyx.position.set(5,  2, 0);
    objectSet.object1.phyx.position.set(2,  3, 0);
    objectSet.object1.mesh.castShadow = true;
    objectSet.object2.mesh.castShadow = true;
    objectSet.object1.mesh.receiveShadow = true;
    objectSet.object2.mesh.receiveShadow = true;







    //console.log(objectSet.object2.mesh.position);


    light.position.set( 556, 555, 555 );
    light.lookAt( scene.position );
    light.castShadow = true;
    scene.add( new THREE.CameraHelper( light.shadow.camera ) );
    scene.add( light );

    scene.add( new THREE.AmbientLight( 0x404040 ) );
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.name = 'Spot Light';
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0.3;
    spotLight.position.set( 10, 10, 5 );
    spotLight.castShadow = true;
    spotLight.shadowCameraNear = 8;
    spotLight.shadowCameraFar = 30;
    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;
    scene.add( spotLight );
    scene.add( new THREE.CameraHelper( spotLight.shadow.camera ) );






    //Adding interaction to button
    var button = document.getElementById('addSpeed');
    speedButton = api.interaction.click(button, function () {
      that.addMovement(objectSet.object2, 5);
    });

    //init mouse controls
    controls = new OrbitControls(camera);
    //
    //objectSet.ground.mesh.reciveShadow = true;
    //objectSet.ground.mesh.castShadow = true;

    objectSet.object2.mesh.castShadow = true;
    objectSet.object1.mesh.castShadow = true;

    objectSet.object2.mesh.reciveShadow = true;
    objectSet.object1.mesh.reciveShadow = true;


    light.castShadow = true;
    light.shadowDarkness = 0.5;

    //init render
    //renderer = make.render();


    renderer = api.render.create(camera, { antialias: true });


    //Adding all object into array
    for(var key in objectSet){
      let name = objectSet[key];
      objectsListToRender.push(name);
    }




    //Adding object to scene using custom method
    api.scene.add(objectsListToRender, 'mesh');
    // LIGHTS

    // add subtle ambient lighting

   // make.add([objectSet.object1.mesh, objectSet.object2.mesh, light]);


    /*
     * Init other methtods
     * cannon() - initialize configurations for physics (cannon.js)
     * animate() - initialize animation progress function with in all required function
     * */
    //fizyka
    this.cannon(objectsListToRender);
    //mesh
    this.animate(objectsListToRender);

  },
  init: function () {
    console.log(api);
    scene = api.scene.create();

    camera = api.camera.create({x: 0, y: 2, z: 15}, 35);

    light = api.light.create();
  },
  //TODO: Te funkcje to powinny bys konstruktory, z konsktruktora obiektu
  // Tworzylo by sie inne obiekty na podstawie wprowadzanych danych etc.
  object: function(props){

    //init materials to build mesh
    var container = {};
    var box = make.geometry(props.geoType, props.geoSize);
    //var box = api.geometry.create(props.geoType, props.geoSize);
    //console.log(api.geometry.create(props.geoType, props.geoSize));
    //console.log(box);

    if(props.phyxType === 'Plane'){
      box.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    }
    material = make.material(props.materialType, props.materialProps);

    //building up mesh from options
    props.meshName = make.mesh(props.meshType, box, material, props.phyxType);

    //Dodawanie mecha do proporcji zwrotnych
    container.mesh = props.meshName;

    //Adding phyx to this mesh
    props.phyxName = props.meshName.construct.init(props.phyxName, props.phyxBodyType, props.phyxBodyTypeParameters, props.phyxShapeType); //init phyx for this object

    //Dodawanie phyx do proporcji zwrotnych
    container.phyx = props.phyxName;

    //return object mesh with phyx
    return container;
  },
  /**
   * @method cannon
   * @desc Initialize whole physics for scene and it's objects
   */
  cannon: function (items) {
    //Cannon init
    world = new CANNON.World();
    world.gravity.set(0, 0, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    //Tutaj trzeba dodac fizyczne "cialo" na ktorym sie odbywa manipulacja do swiata
    items.forEach(function(item){
      //console.log(item);
      world.addBody(item.phyx);
    })

  },
  /**
   * @method animate
   * @desc Three.js function which updates scene
   * @see {@link init}
   */
  animate: function (elements) {
    requestAnimationFrame(this.animate.bind(this, elements));
    this.updatePhysics(elements);


    //elements.forEach(function(item){
    //  console.log(item);
    //});









    this.render();
  },
  /**
   * @method updatePhysics
   * @desc CommonJS function which updates physics of all objects and world
   * @see {@link animate, @link cannon}
   */
  updatePhysics: function (items) {
    // Step the physics world
    world.step(timeStep);

    //Tutaj dodajemy powloke (mesh) obiektu ktorym chcemy manipulowac
    items.forEach(function(item){
      item.mesh.position.copy(item.phyx.position);
      item.mesh.quaternion.copy(item.phyx.quaternion);
    });

  },
  /**
   * @method render
   * @desc three.js Method whose render scene
   * @see {@link init}
   */
  render: function () {
    renderer.render(scene, camera);

  },
  /**
   * @function addMovement
     * @desc adds movment to velocity of an specified element
     * @param object $element - which element will be affected
     * @param number $force - What is the force of affection
   */
  addMovement: function (element, force = 0) {

    let velocity = element.phyx.angularVelocity;
    velocity.y = velocity.y + force;


  },
  onDocumentMouseMove: function (event) {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );

  },
  control: function () {
    //document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
    window.addEventListener('resize', this.onWindowResize, false);
  }
};

export default core;

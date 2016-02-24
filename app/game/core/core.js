//ten plik bedzie zarzadzal wczytywaniem scen.

"use strict";

import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library
var OrbitControls = require('three-orbit-controls')(THREE);
import config from './config'; // importing config of core module

import * as make from './core_helpers';
import {GameObjects} from './GameObjectClass';

var camera, scene, renderer;

//Cannon (physic engine)
var  material, light, speedButton, controls;
var world, timeStep = 1 / 60;
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

    var objectsListToRender = [];


    var objectSet = {
      object1: that.object({
        geoType: 'cylinder',
        geoSize: 'low',
        materialType: 'basic',
        materialProps: {
          wireframe: true
        },
        meshType: 'basic',
        phyxName: 'objectPhyx'
      }),
      object2: that.object({
        geoType: 'box',
        geoSize: 'low',
        materialType: 'basic',
        materialProps: {
          wireframe: false
        },
        meshType: 'basic',
        meshName: 'object2',
        phyxName: 'object2Phyx'
      }),
      object3: that.object({
        geoType: 'box',
        geoSize: 'small',
        materialType: 'basic',
        materialProps: {
          wireframe: true
        },
        meshType: 'basic',
        meshName: 'object3',
        phyxName: 'object3Phyx'
      })

    };


    //Object manipulations
    objectSet.object2.phyx.position.set(2,  2, 0);
    console.log(objectSet.object2.mesh.position);



    //init render
    renderer = make.render();

    //Adding interaction to button
    var button = document.getElementById('addSpeed');
    speedButton = make.interaction(button, function () {
      that.addMovement(objectSet.object2, 5);
    });

    //init mouse controls
    controls = new OrbitControls(camera);

    //Adding all object into array
    for(var key in objectSet){
      let name = objectSet[key];
      objectsListToRender.push(name);
    }

    //Adding object to scene using custom method
    make.add(objectsListToRender);
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
    scene = make.scene();

    camera = make.camera({x: 0, y: 2, z: 15}, 35);

    light = make.light();
  },
  //TODO: Te funkcje to powinny bys konstruktory, z konsktruktora obiektu
  // Tworzylo by sie inne obiekty na podstawie wprowadzanych danych etc.
  object: function(props){

    //init materials to build mesh
    var container = {};
    var box = make.geometry(props.geoType, props.geoSize);
    material = make.material(props.materialType, props.materialProps);

    //building up mesh from options
    props.meshName = make.mesh(props.meshType, box, material);

    //Dodawanie mecha do proporcji zwrotnych
    container.mesh = props.meshName;

    //Adding phyx to this mesh
    props.phyxName = props.meshName.construct.init(props.phyxName); //init phyx for this object

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
      console.log(item);
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

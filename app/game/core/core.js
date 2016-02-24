//ten plik bedzie zarzadzal wczytywaniem scen.

"use strict";

import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library
var OrbitControls = require('three-orbit-controls')(THREE);


import config from './config'; // importing config of core module

import * as make from './core_helpers';


    //TODO: Req.txt
    //TODO: Wstawienie komentarzy
    //TODO: Stworzenie prototypu ktory by zawieral schemat tworzenia nowego "obiektu" w scenie
    //TODO: Zaplanowanie wszystkich taskow, oraz celow ktore chce osiagnac i zrealizowac.

    //Three.js

/** Class representing a GameObject. */

class GameObject {
    /**
     * Create a GameObject.
     */
    constructor(props) {
      this.name = name;
      this.props = props;

    }


}






var camera, scene, renderer;

//Cannon (physic engine)
var geometry, material, mesh, light, speedButton, controls;
var world, mass, square, shape, timeStep = 1 / 60;
var mouseX = 0, mouseY = 0;
var windowHalfY, windowHalfX;

var core = {
  /**
   * @method init
   * @desc Init whole scene with assets
   */
  scener: function (callback) {
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

    //Init all required meshes for scene
    var object1 = this.object({
      geoType: 'cylinder',
      geoSize: 'low',
      materialType: 'basic',
      materialProps: {
        wireframe: true
      },
      meshType: 'basic',
      phyxName: 'objectPhyx'
    });

    //TODO: do phyx for each object
    var object2 = this.object({
      geoType: 'box',
      geoSize: 'low',
      materialType: 'basic',
      materialProps: {
        wireframe: false
      },
      meshType: 'basic',
      meshName: 'object2',
      phyxName: 'object2Phyx'
    });

    console.log(object2);
    renderer = make.render();

    var button = document.getElementById('addSpeed');

    //a tutaj pracuje na'fizyce' obiektu
    /*
    * co nalezy zrobic aby zaktualizowac fizyke?
    * >dodac fizyke do mesha
    * >ma
    * */


    speedButton = make.interaction(button, function () {
      that.addMovement(object2, 5);
    });


    controls = new OrbitControls(camera);


    //tutdaj dodaje meshes
    make.add([object1.mesh, object2.mesh, light]);
    /*
     * Init other methtods
     * cannon() - initialize configurations for physics (cannon.js)
     * animate() - initialize animation progress function with in all required function
     * */

    this.cannon();
    this.updatePhysics(object2);
    this.animate(object2);

  },
  init: function () {
    scene = make.scene();

    camera = make.camera({x: 0, y: 2, z: 15}, 35);

    light = make.light();
  },

  //TODO: Te funkcje to powinny bys konstruktory, z konsktruktora obiektu
  // Tworzylo by sie inne obiekty na podstawie wprowadzanych danych etc.
  object: function(props){

    //TODO: rozwiazac problem z dodawniem wczesniej sprecyzowanego typu dla geometri
    //TODO: Tworzenie wlasnego obiektu na podstawie wlasnych danych, i przypisywanie go automatycznie
    //      Do sceny

    var container = {};
    let name = props.phyxName;

    var box = make.geometry(props.geoType, props.geoSize);

    material = make.material(props.materialType, props.materialProps);


    props.meshName = make.mesh(props.meshType, box, material);

    //container
    container.mesh = props.meshName;

    props.phyxName = props.meshName.construct.init(props.phyxName); //init phyx for this object

    //adding object to world?
    this.cannon(function(){

      //console.log( props.phyxName.angularVelocity);
      var phyx = {};
      phyx.name = name;
      phyx.add = world.addBody(props.phyxName);
      phyx.mesh =  props.phyxName;
      return phyx;
    });


    container.phyx = props.phyxName;
    return container;
  },
  /**
   * @method cannon
   * @desc Initialize whole physics for scene and it's objects
   */
  cannon: function (cb) {
    //Cannon init
    world = new CANNON.World();
    world.gravity.set(0, 0, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    //
    //world.addBody(square);
    if(typeof(cb) !== 'undefined'){
      //Adding newly created meshes to cannon.js world

      world.addBody(cb().mesh);
      console.log(world.bodies);

//      console.log(element);

    }

  },
  /**
   * @method animate
   * @desc Three.js function which updates scene
   * @see {@link init}
   */
  animate: function (object2) {
    requestAnimationFrame(this.animate.bind(this, object2));
    this.updatePhysics(object2);
    this.render();
  },
  /**
   * @method updatePhysics
   * @desc CommonJS function which updates physics of all objects and world
   * @see {@link animate, @link cannon}
   */
  updatePhysics: function (object2) {
    // Step the physics world


    world.step(timeStep);

    object2.mesh.position.copy(object2.phyx.position);
    object2.mesh.quaternion.copy(object2.phyx.quaternion);
    // Copy coordinates from Cannon.js to Three.js


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

    console.log(element.phyx);
    let velocity = element.phyx.angularVelocity;
    velocity.y = velocity.y + force;

    console.log(element);

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


var newObject = new GameObject();

newObject.props =  core.object({
  geoType: 'box',
  geoSize: 'low',
  materialType: 'basic',
  materialProps: {
    wireframe: false
  },
  meshType: 'basic',
  phyxName: 'siemanko1'

});

//console.log(newObject);

export default core;

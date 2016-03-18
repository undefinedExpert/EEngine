//ten plik bedzie zarzadzal wczytywaniem scen.

"use strict";

import THREE from 'three'; // 3D library
import CANNON from 'cannon'; // Physics Library
var OrbitControls = require('three-orbit-controls')(THREE);
import config from './config'; // importing config of core module
import smoothie from 'smoothie';
import Stats from 'stats.js';

import * as api from './makers/maker';

import { ipcRenderer, remote  } from 'electron'; // electron system
import * as $ from 'jquery';

import * as demo from './core/main.js';

//import * as method from './methods/method'; //todo: refactor whole core file

var camera, scene, renderer, CurrentScene;
var NEAR = 10, FAR = 3000;
//Cannon (physic engine)
var  material, light, speedButton, controls;
var world, timeStep = 1 / 60;
var lightPosition4D = new THREE.Vector4();

var mouseX = 0, mouseY = 0;
var windowHalfY, windowHalfX, fpsStats;

/*
 przykladowe uzcie nowego API kreacji
 wazne tutaj jest to aby core bylo zbudowane z klasy i mialo wbudowane w sobie wszystkie
 metody ktore sa ponizej,  mozemy w ten sposob w naszej funkcji extend wykorzystywac
 wszystkie metody z glownej funkcji core jesli tylko tego chcemy

core.extend(function(scener){
 //...
 });

 Ponadto mozna by bylo stworzyc, modify ktore wplywalo by bezposrednio w tym obiekcie na
 nasze metody np.
 core.modify(function(cannon){
   //... tutaj modifikujemy nasze leementy, powinnnismy miec dostep do wszystkich zmiennych etc
 })

 */

var core = {
  /**
   * @method init
   * @desc Init whole scene with assets
   */
  scener: function () {
    let that = this;

    /////////////////////Experiements
    console.log(demo);

    demo.demoCore.config('Scener', function(){
      let scope = this;

      scope.config('Composer', function(){
        //console.log(api);
        scope.scene = scope.api.scene.create();
        scope.camera = scope.api.camera.create({x: 0, y: 3, z: 50}, 35);
        scope.objectsListToRender = [];
        scope.lightListToRender = [];

      });




    });



    //
    //demo.demoCore.extend('Scener', function(){
    //  let scope = this;
    //  console.log(scope.siemanko);
    //});
    //
    //
    //demo.demoCore.config('Composer', function(){
    //  let scope = this;
    //  scope.siemanko = 'Czesc Ziomek';
    //});
    //
    //demo.demoCore.extend('Scener', function(){
    //  let scope = this;
    //  scope.log(scope.siemanko);
    //});
    //
    //
    //
    //







    //////////////














    //methode.init(scene,CurrentScene,camera, light);

    //W tej funkcji bede wczytywal poziomy
    //Oraz dodawal wszystkie elementy potrzebne do importu takiej sceny, obiekty itd.
    //Ta funkcja bedzie wykorzystywana do scalania kazdej sceny.

    //Jakie elementy sa potrzebne do stworzenia sceny?
    //1. dla three.js scena
    //2. Kamera
    //3. Swiatlo
    //4. Obiekty
    //this.init();

    //Init all basic functions which are create scene an so
    //TODO: Latwiejsze dodawanie swiatel do widoku
    //TODO: Rozbicie tego pliku na mniejsze pliki
    //TODO: Implementacja dzwiekow
    //TODO: Kolekcja obiektow / zbior obiektow ktory wskazuje na obiekt o proporcjach z danego zbioru
    //TODO: Ladowanie tekstur
    //TODO: Ladowanie animacji
    //TODO: Dodawanie modeli
    var objectsListToRender = [];
    var lightListToRender = [];



    //todo: refactor - powinno to bardziej przypominac tworzenie obiektu z jakimis domyslnymi wartosciami
    //Po za tym wpisywanie tego za kazdym razem bedzie meczace, dlatego have to be done

    var lightSet = {
      directionalLight: api.light.create('Directional', {color: 0xffffff}, function(crafted){
        crafted.shadowMapDarkness = 0.5;
        crafted.position.set(30, 100, 0);
        crafted.target.position.set(0, 0, 0);
        crafted.castShadow = true;
        crafted.shadow.camera.near = 0;
        crafted.shadow.camera.far = 300;
        crafted.shadow.mapSize.width = 4096;
        crafted.shadow.mapSize.height = 4096;
        crafted.shadow.camera.left = -50;
        crafted.shadow.camera.right = 50;
        crafted.shadow.camera.top = 50;
        crafted.shadow.camera.bottom = -50;
        new THREE.CameraHelper( crafted.shadow.camera);

      }),
      spotLight:  api.light.create('Spot', {color: 0xffffff}, function(crafted){
        crafted.position.set( 10, 10, 15 );
        crafted.castShadow = true;
        crafted.shadow.camera.near = 8;
        crafted.shadow.camera.far = 30;
        crafted.shadowMapDarkness = 0.5;
        crafted.shadow.mapSize.width = 4096;
        crafted.shadow.mapSize.height = 4096;
        crafted.shadow.bias = 0;
        new THREE.CameraHelper( crafted.shadow.camera);
      }),
      ambient: api.light.create('Ambient', {color: 0x404040}, function(){})
    };
    var objectSet = {
      object1: that.object({
        geoType: 'Cylinder',
        geoSize: 'low',
        materialType: 'phong',
        materialProps: {
          color: 'rgb(255,0,0)',
          emissive: 0x200000,
          shininess: 150,
          specular: 0x222222,
          shading: THREE.SmoothShading
        },
        meshName: 'cylinder',
        position: [6,3,0],
        phyxBodyTypeParameters: {
          mass: 30
        }
      }),
      object2: that.object({
        geoType: 'box',
        geoSize: 'medium',
        materialType: 'phong',
        materialProps: {
          color: 'rgb(0,255,0)',
          emissive: 0x200000,
          shininess: 150,
          specular: 0x222222,
          shading: THREE.SmoothShading
        },
        meshName: 'object2',
        position: [0,5,0],
        phyxBodyTypeParameters: {
          mass: 30
        }
      }),
      plane: that.object({
        geoType: 'plane',
        geoSize: 'huge',
        materialType: 'phong',
        materialProps: {
          color: 0xa0adaf,
          shininess: 350,
          specular: 0xefefef,
          shading: THREE.SmoothShading
        },
        flipX: true,
        meshName: 'plane',
        phyxBodyTypeParameters: {
          mass: 0
        },
        shadow: {
          receive: true
        },
        /**
          * @desc manipulation it might be a @function or @object
          * @param {object} mesh - Crafted mesh of this object
          * @param {object} phyx - crafted phyx of this object
        */
        manipulation: function(mesh,phyx){
          //...;
        }

      })

    };


    //grid helper
    var grid = new THREE.GridHelper(100, 10);
    scene.add(grid);





    //Adding interaction to button
    var button = document.getElementById('addSpeed');
    speedButton = api.interaction.click(button, function () {
      that.addMovement(objectSet.object2, 10);
    });



    $(window).keydown(function( event ) {
      if (event.which == 65) {
        event.preventDefault();
        that.addMovement(objectSet.object2, 'left', -15);
      }
      if (event.which == 68) {
        event.preventDefault();
        that.addMovement(objectSet.object2, 'right', 15);
      }

      if (event.which == 87) {
        event.preventDefault();
        that.addMovement(objectSet.object2, 'up', 15);
      }

      if (event.which == 83) {
        event.preventDefault();
        that.addMovement(objectSet.object2, 'down', -15);
      }
      if (event.which == 32) {
        event.preventDefault();
        that.addMovement(objectSet.object2, 'jump', 15);
      }
    });


    //TODO: remove this from this file
    //Fullescreen event
    var fullScreen = document.getElementById('fullscreen');

    fullScreen.addEventListener('click', function () {
      //console.log('enter fullscreen');
      ipcRenderer .send('enter-full-screen');
    });


    var container = document.getElementById( "blocker" );

    fpsStats = new Stats();
    fpsStats.domElement.style.position = 'absolute';
    fpsStats.domElement.style.top = '0px';
    container.appendChild( fpsStats.domElement );

    //init mouse controls
    controls = new OrbitControls(camera);

    //init render with options
    renderer = api.render.create(camera, scene, { antialias: true,devicePixelRatio: window.devicePixelRatio || 1});


    //Adding all object into array
    for(let key in objectSet){
      let name = objectSet[key];
      objectsListToRender.push(name);
    }

    for(let key in lightSet){
      //console.log(key);
      let name = lightSet[key];
      lightListToRender.push(name);
    }

    //console.log(lightListToRender);
    //Adding object to scene using custom method
    api.scene.add(objectsListToRender, 'mesh');
    //api.scene.add(lightListToRender, 'light');


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

    //Resize event
    this.control();
    fpsStats.update();

  },
  init: function () {
    //console.log(api);
    scene = this.CurrentScene = api.scene.create();


    camera = api.camera.create({x: 0, y: 3, z: 50}, 35);

    //todo: refactor lights to add them automaticly into view
    light = api.light.create('Directional', {color: 0xffffff}, function(crafted){
      crafted.shadowMapDarkness = 0.5;
      crafted.position.set(30, 100, 0);
      crafted.target.position.set(0, 0, 0);
      crafted.castShadow = true;
      crafted.shadow.camera.near = 0;
      crafted.shadow.camera.far = 300;
      crafted.shadow.mapSize.width = 4096;
      crafted.shadow.mapSize.height = 4096;
      crafted.shadow.camera.left = -50;
      crafted.shadow.camera.right = 50;
      crafted.shadow.camera.top = 50;
      crafted.shadow.camera.bottom = -50;
    });

    scene.add( new THREE.CameraHelper( light.shadow.camera ) );
    scene.add( light );

  },
  /**
   * @method object
   * @desc This method build up fully working mesh from bunch of properties, it also bulds up a physical body for that mesh
   */

  object: function(props){
    let thatObject = this;

    //Default props
    let defaultProps = {
      geoType: props.geoType || 'Box',
      geoSize: props.geoSize || 'small',
      materialType: props.materialType || 'basic',
      materialProps: props.materialProps || {color: 0xff0000},
      flipX: props.flipX || false,
      meshType: props.meshType || 'basic',
      meshName: props.meshName || error('set a propertie name of this object: ' + props),
      phyxName: props.meshName + 'phyx',
      phyxType: props.phyxType || 'Body',
      phyxShapeType: props.geoType || 'Box',
      phyxBodyTypeParameters: props.phyxBodyTypeParameters || {mass: 1},
      position: props.position || [0, 0, 0],
      manipulation: props.manipulation,
      shadow: props.shadow || {cast: true, receive: true}
    };

    //default value for manipulation
    defaultProps.manipulation = typeof props.manipulation === 'object' || typeof defaultProps.manipulation === 'function' ? defaultProps.manipulation :{mesh: function(){}, phyx(){}};
    //init materials to build mesh
    var container = {};
    //var box = make.geometry(defaultProps.geoType, defaultProps.geoSize);
    var geometry = api.geometry.create(defaultProps.geoType, defaultProps.geoSize);

    //Build up a material for upcoming object
    material = api.material.create(defaultProps.materialType, defaultProps.materialProps);
    //console.log(material);
    //building up mesh from options
    props.meshName = api.mesh.create(defaultProps.meshType, geometry, material, defaultProps.phyxType, defaultProps.phyxShapeType, defaultProps.phyxBodyTypeParameters, defaultProps.position, this.CurrentScene);

    //Freshly object manipulation, adding shadows and at future more.
    //if set to recive shadow
    props.meshName.receiveShadow = defaultProps.shadow.receive;

    //if set to cast shadow
    props.meshName.castShadow = defaultProps.shadow.cast;

    //mesh manipulation callback
    if(typeof defaultProps.manipulation !== 'function'){
      defaultProps.manipulation.mesh(props.meshName);
    }

    //Dodawanie mecha do proporcji zwrotnych
    container.mesh = props.meshName;
    if(defaultProps.flipX === true){
      props.meshName.phyx.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    }

    //Adding phyx to this mesh
    defaultProps.phyxName = props.meshName.phyx; //init phyx for this object

    //phyx manipulation callback
    if(typeof defaultProps.manipulation !== 'function'){
      defaultProps.manipulation.phyx(defaultProps.phyxName); //Phyx manipulation callback
    } //Phyx manipulation callback

    //Dodawanie phyx do proporcji zwrotnych
    container.phyx = defaultProps.phyxName;
    if(typeof defaultProps.manipulation === 'function'){
      defaultProps.manipulation(container.mesh, container.phyx);
    }

    function error(txt){
      throw(txt);
    }

    //return object mesh with phyx
    return container;
  },
  /**
   * @method cannon
   * @desc Initialize whole physics for scene and it's objects
   */
  cannon: function (items) {
    //Todo: refactor
      world = new CANNON.World();
      world.gravity.set(0, -10, 0);
      world.broadphase = new CANNON.NaiveBroadphase();
      world.solver.iterations = 20;
      world.quatNormalizeSkip = 0;
      world.quatNormalizeFast = false;
      world.defaultContactMaterial.contactEquationStiffness = 1e7;
      world.defaultContactMaterial.contactEquationRelaxation = 4;
      world.doProfiling = true;

      var solver = new CANNON.GSSolver();
      solver.iterations = 7;
      solver.tolerance = 0.1;

      var split = true;
      if(split)
        world.solver = new CANNON.SplitSolver(solver);
      else
        world.solver = solver;

      var physicsMaterial = new CANNON.Material("slipperyMaterial");
      //Tutaj trzeba dodac fizyczne "cialo" na ktorym sie odbywa manipulacja do swiata
      var physicsContactMaterial = new CANNON.ContactMaterial(physicsMaterial, physicsMaterial, [0.1, 0.3]);
      // We must add the contact materials to the world
      world.addContactMaterial(physicsContactMaterial);
      world.solver.iterations = 20; // Increase solver iterations (default is 10)
      world.solver.tolerance = 0;   // Force solver to use all iterations

      items.forEach(function(item){
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

    fpsStats.update();
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
    items.forEach(function(item, that){
      item.mesh.position.copy(item.phyx.position);
      item.mesh.quaternion.copy(item.phyx.quaternion);

      //ComputeAABB jest to funkcja ktora cos tam robi
      item.phyx.buildAABBMesh.restart();
      if(item.phyx.computeAABB){

        //?????????????????
        if(item.phyx.aabbNeedsUpdate){
          item.phyx.computeAABB();
        }

        if( isFinite(item.phyx.aabb.lowerBound.x) && isFinite(item.phyx.aabb.lowerBound.y) && isFinite(item.phyx.aabb.lowerBound.z) && isFinite(item.phyx.aabb.upperBound.x) && isFinite(item.phyx.aabb.upperBound.y) && isFinite(item.phyx.aabb.upperBound.z) && item.phyx.aabb.lowerBound.x - item.phyx.aabb.upperBound.x != 0 && item.phyx.aabb.lowerBound.y - item.phyx.aabb.upperBound.y != 0 && item.phyx.aabb.lowerBound.z - item.phyx.aabb.upperBound.z != 0){


          let mesh = item.phyx.buildAABBMesh.request();


          mesh.scale.set( item.phyx.aabb.lowerBound.x - item.phyx.aabb.upperBound.x,
            item.phyx.aabb.lowerBound.y - item.phyx.aabb.upperBound.y,
            item.phyx.aabb.lowerBound.z - item.phyx.aabb.upperBound.z);
          mesh.position.set(  (item.phyx.aabb.lowerBound.x + item.phyx.aabb.upperBound.x)*0.5,
            (item.phyx.aabb.lowerBound.y + item.phyx.aabb.upperBound.y)*0.5,
            (item.phyx.aabb.lowerBound.z + item.phyx.aabb.upperBound.z)*0.5);
        }
      }
      item.phyx.buildAABBMesh.hideCached();
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
  addMovement: function (element, key, force) {
    let velocity = element.phyx.velocity;

    switch(key) {
      case 'left':
        velocity = velocity.set(force,0,0);
        break;
      case 'right':
        velocity = velocity.set(force,0,0);
        break;
      case 'up':
        velocity = velocity.set(0,0,force);
        break;
      case 'down':
        velocity = velocity.set(0,0,force);
        break;
      case 'jump':
        velocity = velocity.set(0,force,0);
        break;

    }

  },
  onDocumentMouseMove: function (event) {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );

  },
  control: function () {
    let that = this;
    //resize
    window.addEventListener('resize', function(e){
      e.preventDefault();
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    });
  }
};

export default core;

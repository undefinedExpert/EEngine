//ten plik bedzie zarzadzal wczytywaniem scen.

"use strict";

import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library
var OrbitControls = require('three-orbit-controls')(THREE);


import config from './config'; // importing config of core module

import * as make from './core_helpers';


/**
 * helper module.
 */



//TODO: Req.txt
//TODO: Wstawienie komentarzy
//TODO: Stworzenie prototypu ktory by zawieral schemat tworzenia nowego "obiektu" w scenie
//TODO: Zaplanowanie wszystkich taskow, oraz celow ktore chce osiagnac i zrealizowac.

//Three.js
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


            scene = make.scene();

            light = make.light();

            camera = make.camera();

            geometry = make.geometry();

            material = make.material();

            mesh = make.mesh();

            make.add([mesh, light]);

            renderer = make.render();

            square = make.mesh.construct.init(square);



            square.addShape(square.shape);


            var button = document.getElementById('addSpeed');
            speedButton = make.interaction(button, function(){
                  that.addMovement(square,5);
            });


            controls = new OrbitControls(camera);

            /*
             * Init other methtods
             * cannon() - initialize configurations for physics (cannon.js)
             * animate() - initialize animation progress function with in all required function
             * */

            this.cannon();
            this.animate();

      },
      /**
       * @method cannon
       * @desc Initialize whole physics for scene and it's objects
       */
      cannon: function () {
            //Cannon init
            world = new CANNON.World();
            world.gravity.set(0, 0, 0);
            world.broadphase = new CANNON.NaiveBroadphase();
            world.solver.iterations = 10;


            world.addBody(square);
      },
      /**
       * @method animate
       * @desc Three.js function which updates scene
       * @see {@link init}
       */
      animate: function () {
            requestAnimationFrame(this.animate.bind(this));

            this.updatePhysics();
            this.render();
      },
      /**
       * @method updatePhysics
       * @desc CommonJS function which updates physics of all objects and world
       * @see {@link animate, @link cannon}
       */
      updatePhysics: function () {
            // Step the physics world
            world.step(timeStep);

            // Copy coordinates from Cannon.js to Three.js
            /*
             * Tutaj aktualizuje pozycje mecha z wartoscia ktora jest sprecyzowana w core.cannon()
             * */
            mesh.position.copy(square.position);
            mesh.quaternion.copy(square.quaternion);
      },
      /**
       * @method render
       * @desc three.js Method whose render scene
       * @see {@link init}
       */
      render: function () {

            camera.position.x += ( mouseX - camera.position.x ) * .00002;
            camera.position.y = THREE.Math.clamp( camera.position.y + ( - mouseY - camera.position.y ) * .00002, 0, 1000 );



            renderer.render(scene, camera);
      },
      /**
       * @function addMovement
         * @desc adds movment to velocity of an specified element
         * @param object $element - which element will be affected
         * @param number $force - What is the force of affection
       */
      addMovement: function (element, force = 0) {

            console.log(element);
            let velocity = element.angularVelocity;
            velocity.y = velocity.y + force;

      },
      onDocumentMouseMove: function(event) {

            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            mouseX = ( event.clientX - windowHalfX );
            mouseY = ( event.clientY - windowHalfY );

      },
      control: function(){
            //document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
            window.addEventListener( 'resize', this.onWindowResize, false );


      }


};

export default core;

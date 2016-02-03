"use strict";

import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library

//Three.js
var camera, scene, renderer;

//Cannon (physic engine)
var geometry, material, mesh;
var world, mass, square, shape, timeStep = 1 / 60;



var core = {

      /**
       * @method init
       * @desc Init whole scene with assets
       */
      init: function () {
            scene = new THREE.Scene();
            var directionalLight = new THREE.DirectionalLight(0xffeedd);
            directionalLight.position.set(0, 0, 1).normalize();
            scene.add(directionalLight);

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
            camera.position.z = 5;
            scene.add(camera);

            geometry = new THREE.BoxGeometry(2, 2, 2);
            material = new THREE.MeshBasicMaterial({
                  color: 0xff0000,
                  wireframe: true
            });

            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);

            document.body.appendChild(renderer.domElement);


            //Interaction with square button
            var addSpeedButton = document.getElementById('addSpeed');
            addSpeedButton.addEventListener('click', () => {
                  this.addMovement(square, 5);
            });


            /*
             * Init other functions
             * cannon() - initialize configurations for physics (cannon.js)
             * animate() - initialize animation progress function with in all required function
             * updatePhysics() - initialize updatePhysics progress function with in all required function
             * render() - three.js rendering function
             * */

            this.cannon();
            this.animate();
            this.updatePhysics();
            this.render();
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

            //Dodaje nowy "kolidator" dla body nadaje mu wartosci masy ksztaltu obrotu etc i by na koncu dodac go to "world", czyli sceny
            shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
            mass = 1;
            square = new CANNON.Body({
                  mass: 1
            });
            square.addShape(shape);
            square.angularVelocity.set(0, 0, 0);

            square.angularDamping = 0.5;
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
            renderer.render(scene, camera);
      },

      /**
        * @function addMovment
        * @desc opens a modal window to display a message
        * @param string $msg - the message to be displayed
        * @return bool - success or failure
      */

      addMovement: function(element, force) {

          let meshPosition = mesh.position.copy(element.position);
          let meshQuaternion = mesh.quaternion.copy(element.quaternion);

          element.angularVelocity.y = element.angularVelocity.y + force;
      }

};

export default core;

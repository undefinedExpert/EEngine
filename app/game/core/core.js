"use strict";

import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library


//Setting namespaces for values

//Three.js
var camera, scene, renderer;

//Cannon (physic engine)
var geometry, material, mesh;
var world, mass, body, shape, timeStep = 1 / 60;


var core = {

      /**
       * @function init
         * @desc Init whole scene with assets
       */
      init: function () {
            scene = new THREE.Scene();
            // Adding lighting
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

      cannon: function () {
            //Cannon init
            world = new CANNON.World();
            world.gravity.set(0, 0, 0);
            world.broadphase = new CANNON.NaiveBroadphase();
            world.solver.iterations = 10;

            //Dodaje nowy "kolidator" dla body nadaje mu wartosci masy ksztaltu obrotu etc i by na koncu dodac go to "world", czyli sceny
            shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
            mass = 1;
            body = new CANNON.Body({
                  mass: 1
            });
            body.addShape(shape);
            body.angularVelocity.set(25, 15, 15);
            body.angularDamping = 0.5;
            world.addBody(body);
      },
      animate: function () {
            //requestAnimationFrame(this.animate.bind(this.()));
            requestAnimationFrame(this.animate.bind(this));

            //Aktualizuje fizyke
            this.updatePhysics();
            this.render();
      },
      updatePhysics: function () {
            // Step the physics world
            world.step(timeStep);

            // Copy coordinates from Cannon.js to Three.js
            /*
             * Tutaj aktualizuje pozycje mecha z wartoscia ktora jest sprecyzowana w core.cannon()
             * */
            mesh.position.copy(body.position);
            mesh.quaternion.copy(body.quaternion);
      },
      render: function () {
            renderer.render(scene, camera);
      }

};

export default core;

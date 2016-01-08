import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library

var camera, scene, renderer;

//Cannon
var geometry, material, mesh;
var world, mass, body, shape, timeStep = 1 / 60;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;



var core = {

        init: function () {


            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
            camera.position.z = 5;
            scene.add(camera);

            geometry = new THREE.BoxGeometry(2, 2, 2);
            material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);

            document.body.appendChild(renderer.domElement);


            //	container = document.createElement( 'div' );
            //	document.body.appendChild( container );
            //
            //	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
            //	camera.position.z = 4;
            //camera.position.y = 1;
            //
            //
            //	// scene
            //
            //	scene = new THREE.Scene();
            //
            //	var ambient = new THREE.AmbientLight( 0x444444 );
            //	scene.add( ambient );
            //
            //	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
            //	directionalLight.position.set( 0, 0, 1 ).normalize();
            //	scene.add( directionalLight );
            //
            //	// BEGIN Clara.io JSON loader code
            //	var objectLoader = new THREE.ObjectLoader();
            //	objectLoader.load("assets/example.json", function ( obj ) {
            //  		mesh = obj.children[0];
            //		console.log(mesh);
            //	 	scene.add( obj );
            //	} );
            //	// END Clara.io JSON loader code
            //

            //	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
            //
            //	//
            //
            //	window.addEventListener( 'resize', onWindowResize, false );

        },
        cannon: function(){
            //Cannon

            world = new CANNON.World();
            world.gravity.set(0, 0, 0);
            world.broadphase = new CANNON.NaiveBroadphase();
            world.solver.iterations = 10;

            shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
            mass = 1;
            body = new CANNON.Body({
                mass: 1
            });
            body.addShape(shape);
            body.angularVelocity.set(25, 50, 0);
            body.angularDamping = 0.5;
            world.addBody(body);
        },
        animate: function(){


            //requestAnimationFrame(this.animate.bind(this.()));
           requestAnimationFrame(this.animate.bind(this));
                this.updatePhysics();
                this.render();


        },
        updatePhysics: function(){
            // Step the physics world
            world.step(timeStep);

            // Copy coordinates from Cannon.js to Three.js
            mesh.position.copy(body.position);
            mesh.quaternion.copy(body.quaternion);
        },

        render: function(){

        renderer.render(scene, camera);

    }


};

export default core;
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

            // Adding lighting
          	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
          	directionalLight.position.set( 0, 0, 1 ).normalize();
          	scene.add( directionalLight );

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100);
            camera.position.z = 5;
            scene.add(camera);

            geometry = new THREE.BoxGeometry(2, 2, 2);
            material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

          //
          //var objectLoader = new THREE.ObjectLoader();

          //function createObject( objFile, objName ) {
          //  var container = new THREE.Object3D();
          //  objectLoader.load( objFile , function ( object ) {
          //    object.name = objName;
          //    container.add( object );
          //  });
          //  return container;
          //}D:\game_dev\elizabeth\ele-boilerplate\electron-boilerplate\build\node_modules\three.js\build\three.…:21257 THREE.WebGLRenderer 73
          //
          //var sceneLoaded = createObject('assets/example.json', 'Scene');
          //    console.log(sceneLoaded.objName);

          //TODO: resolve async problem
          //function loadObject(objectFileToLoad, callback) {
          //
          //  var container = new THREE.Object3D();
          //
          //    objectLoader.load( objectFileToLoad , function ( loadedObject ) {
          //     // console.log(loadedObject.getObjectByName('Circle'));
          //      container.add( loadedObject );
          //    });
          //
          //  return container;
          //
          //}
          //var objectLoaded = loadObject('assets/example.json');
          //
          //
          //
          //console.log(objectLoaded);


          //objectLoader.load("assets/example.json", function ( obj ) {
          //    console.log(obj);
          //    circle = obj.getObjectByName('Circle');
          //	 	scene.add( obj.getObjectByName('Circle') );
          //	} );

          //console.log(circle);
          //var allChildren = scene.children;
          //var lastObject = allChildren[allChildren.length-1];
          //console.log( scene.children)
          //if (lastObject instanceof THREE.Mesh) {
          //  //scene.remove(lastObject);
          //  console.log(lastObject)
          //  this.numberOfObjects = scene.children.length;
          //}

          //console.log(mesh);

            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);

            document.body.appendChild(renderer.domElement);


            //	container = document.createElement( 'div' );
            //	document.body.appendChild( container );
            //
            //	// scene
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
        animate: function(){


            //requestAnimationFrame(this.animate.bind(this.()));
          requestAnimationFrame(this.animate.bind(this));

          //Aktualizuje fizyke
          this.updatePhysics();
          this.render();


        },
        updatePhysics: function(){
            // Step the physics world
            world.step(timeStep);

            // Copy coordinates from Cannon.js to Three.js
            /*
            * Tutaj aktualizuje pozycje mecha z wartoscia ktora jest sprecyzowana w core.cannon()
            * */
            mesh.position.copy(body.position);
            mesh.quaternion.copy(body.quaternion);
        },

        render: function(){

        renderer.render(scene, camera);

    }


};

export default core;
// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import THREE from 'three.js'; // module loaded from npm
import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author);

document.addEventListener('DOMContentLoaded', function () {
    // document.getElementById('greet').innerHTML = greet();
    // document.getElementById('platform-info').innerHTML = os.platform();
    // document.getElementById('env-name').innerHTML = env.name;

    var container, stats;

  			var camera, scene, renderer;

  			var mouseX = 0, mouseY = 0;

  			var windowHalfX = window.innerWidth / 2;
  			var windowHalfY = window.innerHeight / 2;


  			init();
  			animate();


  			function init() {

  				container = document.createElement( 'div' );
  				document.body.appendChild( container );

  				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
  				camera.position.z = 4;
          camera.position.y = 1;


  				// scene

  				scene = new THREE.Scene();

  				var ambient = new THREE.AmbientLight( 0x444444 );
  				scene.add( ambient );

  				var directionalLight = new THREE.DirectionalLight( 0xffeedd );
  				directionalLight.position.set( 0, 0, 1 ).normalize();
  				scene.add( directionalLight );

  				// BEGIN Clara.io JSON loader code
  				var objectLoader = new THREE.ObjectLoader();
  				objectLoader.load("assets/example.json", function ( obj ) {
  				 	scene.add( obj );
  				} );
  				// END Clara.io JSON loader code

  				renderer = new THREE.WebGLRenderer();
  				renderer.setSize( window.innerWidth, window.innerHeight );
  				container.appendChild( renderer.domElement );

  				document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  				//

  				window.addEventListener( 'resize', onWindowResize, false );

  			}

  			function onWindowResize() {

  				windowHalfX = window.innerWidth / 2;
  				windowHalfY = window.innerHeight / 2;

  				camera.aspect = window.innerWidth / window.innerHeight;
  				camera.updateProjectionMatrix();

  				renderer.setSize( window.innerWidth, window.innerHeight );

  			}

  			function onDocumentMouseMove( event ) {

  				mouseX = ( event.clientX - windowHalfX ) / 2;
  				mouseY = ( event.clientY - windowHalfY ) / 2;

  			}

  			//

  			function animate() {

  				requestAnimationFrame( animate );
  				render();

  			}

  			function render() {

  				// camera.position.x += ( mouseX - camera.position.x ) * .005;
  				// camera.position.y += ( - mouseY - camera.position.y ) * .005;
          //
  				camera.lookAt( scene.position );

  				renderer.render( scene, camera );

  			}


});

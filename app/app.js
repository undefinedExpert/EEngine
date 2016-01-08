/*
*
* Project Specs
*
* 1. Projekt powinnien byc modularny, pozwalac na zaimportowanie odpowiednich modolow
*    a. Modul "Core" - powinnien zawierac kod opowiadajacy za wszystkie komponenty ktore sluza do wirtualizacji i inicjalizacji projektu/gry. Elementy jakie powinny sie tutaj znajdowac to
*    wszelkiego rodzaju domyslne funkcje z three.js/cannon.js ktore beda wykorzystywane w obszarze calej gry.
*    b. Modul "MainMenu" - Modul ten bedzie zawieral funkcje odpowiadajace za nawigacje po menu, bedziemy mogli znalesc tam wszystkie metody konfiguracji calej aplikacji.
*    c. Moduly "etap_00 - etap_x" - Moduly te beda zawieraly wszystkie elementy dotyczace poziomu, liste obiektow, liste dzwiekow, zadania npc etc, wszystkie zaleznosci beda
*    odnosily sie tylko do danego pluginu.
*
* TODO: napisanie reszty specyfikacji
* */

/*
* Importing modules from node_modules
* */
import os from 'os'; // system
import { remote } from 'electron'; // electron system
import jetpack from 'fs-jetpack';  // module which helps with file serving


/*
 * Importing custom modules
 * */
import env from './env'; // Envoierment vars

import core from './game/core/core'; // Envoierment vars



/*
* Setting up GLOBAL vars
* */
var
  app = remote.app,
  appDir = jetpack.cwd(app.getAppPath());


/*
* When electron dom will load then:
* */
document.addEventListener('DOMContentLoaded', function () {
  //




  core.init();

  //console.log(  init().init)
  core.cannon();

  core.animate();

  core.updatePhysics();
  core.render();




  //function onWindowResize() {
  //
  //  windowHalfX = window.innerWidth / 2;
  //  windowHalfY = window.innerHeight / 2;
  //
  //  camera.aspect = window.innerWidth / window.innerHeight;
  //  camera.updateProjectionMatrix();
  //
  //  renderer.setSize(window.innerWidth, window.innerHeight);
  //
  //}

  //function onDocumentMouseMove(event) {
  //
  //  mouseX = ( event.clientX - windowHalfX ) / 2;
  //  mouseY = ( event.clientY - windowHalfY ) / 2;
  //
  //}

  //
  //
  //function animate() {
  //
  //  requestAnimationFrame(animate);
  //  updatePhysics();
  //  render();
  //
  //}
  //
  //function updatePhysics() {
  //
  //  // Step the physics world
  //  world.step(timeStep);
  //
  //  // Copy coordinates from Cannon.js to Three.js
  //  //mesh.position.copy(body.position);
  //  //mesh.quaternion.copy(body.quaternion);
  //
  //}
  //
  //function render() {
  //
  //  //renderer.render(scene, camera);
  //
  //}

  //dodatkowy kodzik

});

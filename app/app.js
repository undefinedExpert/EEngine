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
* When electron DOM will load then:
* */
document.addEventListener('DOMContentLoaded', function () {

  /*
  * Running cores functions:
  * init() - initialize scene and item of three.js
  * cannon() - initialize configurations for physics (cannon.js)
  * animate() - initialize animation progress function with in all requaired function
  * updatePhysics() - initialize updatePhysics progress function with in all requaired function
  * render() - three.js rendering function
  * */

  core.init();
  core.cannon();
  core.animate();
  core.updatePhysics();
  core.render();

});

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import env from './env';
import _ from 'lodash';
//Import Engine file
import core from './game/core/core'; // Envoierment vars

/*
 * Setting up GLOBAL vars
 * */
const app    = remote.app,
      appDir = jetpack.cwd( app.getAppPath() );
/*
 * When electron DOM will load then:
 * */
document.addEventListener( 'DOMContentLoaded', function () {
    /*
     * Running cores functions:
     * init() - initialize all required assets of core modules
     * */
    core.initialize();
    core.extenders();
} );

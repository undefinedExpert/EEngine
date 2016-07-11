/*
* This file is used as a 'core' of our current 'game', at future it won't be used in such a form.
* Right now you can setup here each Object, light, scene and more.
* */

import THREE from 'three'; // 3D library
var OrbitControls = require( 'three-orbit-controls' )( THREE );
import * as api from './makers/maker'; // This file is temporary used here, most of the api is is inside of a at core/main.js file
import { ipcRenderer, remote } from 'electron'; // electron system
import * as $ from 'jquery';
import * as demo from './core/main.js';

var core = {
    /**
     * @method init
     * @desc Init whole scene with assets
     */
    initialize: function () {
        //Configure scene, create/invoke all required modules
        demo.demoCore.config( 'Scener', function () {
            const scener = this;

            scener.config( 'Composer', function () {
                scener.scene = scener.api.scene.create();
                scener.camera = scener.api.camera.create( { x: 0, y: 3, z: 50 }, 35 );

                //init render with options
                scener.renderer = scener.api.render.create( scener.camera, scener.scene, {
                    antialias: true,
                    devicePixelRatio: window.devicePixelRatio || 1
                } );

                //Init 3rd part components
                scener.fpsUpdate( 'fps' );
                let controls = new OrbitControls( scener.camera );
            } );

        } );
    },
    extenders: function () {
        //Extend already builded scene with those elements
        demo.demoCore.extend( 'Scener', function () {
            const scener = this;
            // Adding Grid helper
            var grid = new THREE.GridHelper( 100, 10 );
            scener.scene.add( grid );

            // Compose objects and their interactions
            scener.extend( 'Composer', function () {
                const composer = this;

                // Temporary directional light
                // todo: refactor lights to add them automaticly into view
                const light = api.light.create( 'Directional', { color: 0xffffff }, function ( crafted ) {
                    crafted.shadowMapDarkness = 0.5;
                    crafted.position.set( 30, 100, 0 );
                    crafted.target.position.set( 0, 0, 0 );
                    crafted.castShadow = true;
                    crafted.shadow.camera.near = 0;
                    crafted.shadow.camera.far = 300;
                    crafted.shadow.mapSize.width = 4096;
                    crafted.shadow.mapSize.height = 4096;
                    crafted.shadow.camera.left = -50;
                    crafted.shadow.camera.right = 50;
                    crafted.shadow.camera.top = 50;
                    crafted.shadow.camera.bottom = -50;
                } );
                scener.scene.add( new THREE.CameraHelper( light.shadow.camera ) );
                scener.scene.add( light );

                //Sample object set
                const objectSet = {
                    object1: scener.object( {
                        geoType: 'Cylinder',
                        geoSize: 'huge',
                        materialType: 'phong',
                        materialProps: {
                            color: 'rgb(255,0,0)',
                            emissive: 0x200000,
                            shininess: 150,
                            specular: 0x222222,
                            shading: THREE.SmoothShading
                        },
                        meshName: 'cylinder',
                        position: [ 12, 3, 0 ],
                        phyxBodyTypeParameters: {
                            mass: 230
                        }
                    } ),
                    object2: scener.object( {
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
                        position: [ 0, 5, 0 ],
                        phyxBodyTypeParameters: {
                            mass: 30
                        }
                    } ),
                    plane: scener.object( {
                        geoType: 'plane',
                        geoSize: 'medium',
                        materialType: 'phong',
                        materialProps: {
                            color: 0xffffff,
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
                        manipulation: function ( mesh, phyx ) {

                        }

                    } )
                };

                // Pushes objects to global scener array
                // TODO: Refactor to a function
                for ( let key in objectSet ) {
                    let name = objectSet[ key ];
                    scener.objectsListToRender.push( name );
                }

                // renders objects
                scener.observe.onNext( scener.objectsListToRender );

                //sample interaction demo (hit a)
                $( window ).keydown( function ( event ) {
                    if ( event.which == 65 ) {
                        event.preventDefault();
                        composer.addMovement( objectSet.object2, 'left', 15 );
                    }
                } );

                //sample of interaction demo (hit b)
                $( window ).keydown( function ( event ) {
                    if ( event.which == 68 ) {
                        event.preventDefault();
                        composer.addMovement( objectSet.object1, 'right', 15 );
                    }
                } );
            } )
        } )
    }
};

export default core;






//ten plik bedzie zarzadzal wczytywaniem scen.

"use strict";

import THREE from 'three'; // 3D library
import CANNON from 'cannon'; // Physics Library
var OrbitControls = require('three-orbit-controls')(THREE);
import config from './config'; // importing config of core module
import smoothie from 'smoothie';
import Stats from 'stats.js';

import * as api from './makers/maker';

import { ipcRenderer, remote  } from 'electron'; // electron system
import * as $ from 'jquery';

import * as demo from './core/main.js';

//import * as method from './methods/method'; //todo: refactor whole core file

var camera, scene, renderer, CurrentScene;
var NEAR = 10, FAR = 3000;
//Cannon (physic engine)
var  material, light, speedButton, controls;
var world, timeStep = 1 / 60;
var lightPosition4D = new THREE.Vector4();

var mouseX = 0, mouseY = 0;
var windowHalfY, windowHalfX, fpsStats;

/*
 przykladowe uzcie nowego API kreacji
 wazne tutaj jest to aby core bylo zbudowane z klasy i mialo wbudowane w sobie wszystkie
 metody ktore sa ponizej,  mozemy w ten sposob w naszej funkcji extend wykorzystywac
 wszystkie metody z glownej funkcji core jesli tylko tego chcemy

core.extend(function(scener){
 //...
 });

 Ponadto mozna by bylo stworzyc, modify ktore wplywalo by bezposrednio w tym obiekcie na
 nasze metody np.
 core.modify(function(cannon){
   //... tutaj modifikujemy nasze leementy, powinnnismy miec dostep do wszystkich zmiennych etc
 })

 */

var core = {
  /**
   * @method init
   * @desc Init whole scene with assets
   */
  scener: function () {
    let that = this;

    demo.demoCore.config('Scener', function(){
      let scope = this;
      scope.objectsListToRender = [];
      scope.config('Composer', function(){
        //console.log(api);
        scope.scene = scope.api.scene.create();

        scope.camera = scope.api.camera.create({x: 0, y: 3, z: 50}, 35);
        //init render with options
        scope.renderer = scope.api.render.create(scope.camera, scope.scene, { antialias: true,devicePixelRatio: window.devicePixelRatio || 1});
        //init mouse controls
        controls = new OrbitControls(scope.camera);

        // Which we then observe
        Object.observe(scope.objectsListToRender, function(changes){
          scope.api.scene.add(scope.objectsListToRender, 'mesh');
          scope.cannon(scope.objectsListToRender);
          scope.animate(scope.objectsListToRender);
        });


      });

    });

    demo.demoCore.extend('Scener', function(){
      let scope = this;

      var grid = new THREE.GridHelper(100, 10);
      scope.scene.add(grid);

      scope.extend('Composer', function(){
        let that = this;
        //todo: refactor lights to add them automaticly into view
        //todo: refactor lights to add them automaticly into view
        light = api.light.create('Directional', {color: 0xffffff}, function(crafted){
          crafted.shadowMapDarkness = 0.5;
          crafted.position.set(30, 100, 0);
          crafted.target.position.set(0, 0, 0);
          crafted.castShadow = true;
          crafted.shadow.camera.near = 0;
          crafted.shadow.camera.far = 300;
          crafted.shadow.mapSize.width = 4096;
          crafted.shadow.mapSize.height = 4096;
          crafted.shadow.camera.left = -50;
          crafted.shadow.camera.right = 50;
          crafted.shadow.camera.top = 50;
          crafted.shadow.camera.bottom = -50;
        });

        scope.scene.add( new THREE.CameraHelper( light.shadow.camera ) );
        scope.scene.add( light );


        var objectSet = {
          object1: scope.object({
            geoType: 'Cylinder',
            geoSize: 'low',
            materialType: 'phong',
            materialProps: {
              color: 'rgb(255,0,0)',
              emissive: 0x200000,
              shininess: 150,
              specular: 0x222222,
              shading: THREE.SmoothShading
            },
            meshName: 'cylinder',
            position: [6,3,0],
            phyxBodyTypeParameters: {
              mass: 30
            }
          }),
          object2: scope.object({
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
            position: [0,5,0],
            phyxBodyTypeParameters: {
              mass: 30
            }
          }),
          plane: scope.object({
            geoType: 'plane',
            geoSize: 'huge',
            materialType: 'phong',
            materialProps: {
              color: 0xa0adaf,
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
            manipulation: function(mesh,phyx){
              //...;
            }

          })

        };
        for(let key in objectSet){
          let name = objectSet[key];
          scope.objectsListToRender.push(name);
        }

        $(window).keydown(function( event ) {
          if (event.which == 32) {
            event.preventDefault();
            that.addMovement(objectSet.object2, 'jump', 15);
          }
        });

      })

    })


  }
};

export default core;

/*
* This file contains bunch of class and objects which are used in core.js file
* */

"use strict";
import THREE from 'three'; // 3D library
import CANNON from 'cannon'; // Physics Library
import helpers from './collectors/helpers';
import scene from './scene/scene';
import render from './render/render';
import camera from './camera/camera';
import lights from './lights/light';
import interactions from './interactions/interaction';
import geometries from './objects/geometries/geometry';
import materials from './objects/materials/material';
import meshes from './objects/mesh/mesh';

export {
/**
 * @desc list exports
 * @param {object} helpers - helpers contain all helper functions which are used across whole application
 * @param {object} scene - Scene object which is used to create three.js scene
 * @param {object} render - used for creation a function "render" which is used by three.js
 * @param {object} camera - Sets up camera settings
 * @param {object} lights - Sets up lights
 * @param {object} interactions - Might be used to create interactive buttons
 * @param {object} geometries - bunch of geometries which are used to build up mesh/models as well as for phyx
 * @param {object} materials - This one is used as well as geometries, it's setup material for objects
 * @param {object} meshes - This objects is used to build up mesh from represented settings,
 *        it's collect specific material and geometry and uses them to build up a mesh
 *        with custom phyx created by cannon.js, phyx shape is also a geometry shape,
 *        if user want to build up a different shape for geometry instead of using
 *        custom he might choose right options avalible at an API of this object
 *
 */
  helpers as helper,
  scene as scene,
  render as render,
  camera as camera,
  lights as light,
  interactions as interaction,
  geometries as geometry,
  materials as material,
  meshes as mesh
};

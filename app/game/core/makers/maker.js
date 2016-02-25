"use strict";

/*
 *
 * Ten plik zawiera funkcje ktore sa aktywnie wykorzystywane w naszym pliku core
 * TODO: Rozibice tego pliku na mniejsze czesci
 * */

import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library

import scene from './scene/scene';

import render from './render/render';

import lights from './lights/light';

import interactions from './interactions/interaction';











export {
/**
 * Get the red, green, and blue values of a color.
 * @function
 * @param {string} color - A color, in hexidecimal format.
 * @returns {Array.} An array of the red, green, and blue values,
 * each ranging from 0 to 255.
 */
  scene as scene,
  render as render,
  lights as light,
  interactions as interaction
};

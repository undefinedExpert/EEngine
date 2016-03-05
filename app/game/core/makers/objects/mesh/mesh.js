import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library

import helpers from './../../collectors/helpers';

//Import recipes object from ./recipe file.
import * as recipe from './recipes/recipe' ;



/**
 * @desc Returns material object
 * @class Mesh
 */
class Mesh {

  constructor() {}

  /**
   * @desc Request a build function to make mesh from set of properties
   * @param {string} type - Type of mesh, default value is 'basic'
   * @param {object} geometry - geometry of upcoming mesh
   * @param {object} material - material for that mesh
   * @param {string} phyxType - physical type for mesh (like Body)
   * @param {string} phyxShapeType - physical shape type a for mesh (like Plane)
   * @param {object} phyxProperties - physical properties for mesh
   * @param {object} position - physical properties for mesh
   * @return fully build material from options
   */
  create(type = 'basic', geometry, material, phyxType='Body', phyxShapeType='Body', phyxProperties={mass: 0}, position=[0,0,0]) {

    //Making sure it's uppercase
    phyxType = helpers.toTitleCase(phyxType);
    phyxShapeType = helpers.toTitleCase(phyxShapeType);

    //It build up mesh
    let fullyBuildedMesh = this.buildMesh(type, geometry, material, phyxType, position);

    //It's attaching physic to that builded mesh
    fullyBuildedMesh.phyx = this.buildPhyx(phyxType, phyxProperties, phyxShapeType, position);

    return fullyBuildedMesh;
  }

  /**
   * @desc builds a material From MeshRecipe class
   * @param {string} type - Type of mesh, default value is 'basic'
   * @param {object} geometry - geometry of upcoming mesh
   * @param {object} material - material for that mesh
   * @param {object} phyxType - physical type for mesh
   * @return crafted mesh
   * @requires MeshRecipe Class - Default class for building meshes
   */
  buildMesh(type, geometry, material, phyxType, position) {

    var obj = new recipe.MeshRecipe(type, geometry, material, phyxType);
    var crafted = obj.craft();

    crafted.position.x = position[0];
    crafted.position.y = position[1];
    crafted.position.z = position[2];
    return crafted;

  }

  /**
   * @desc builds a physical shape for a mesh
   * @param {string} phyxType - Type of physics to build
   * @param {object} phyxProperties - proporties for a base physics
   * @param {object} phyxShapeType - shape of a physics
   * @return crafted physics of a mesh
   */
  buildPhyx(phyxType, phyxProperties, phyxShapeType, position) {

    //build phyx shape
    var phyxShape = this.buildPhyxShape(phyxShapeType, position);

    console.log(phyxShape);
    //phyxProperties.shape = phyxShape;
    //build base of phyx
    var phyxBase = this.BuildBasicPhyx(phyxType, phyxProperties);

    if(phyxShapeType === 'Plane'){
      let planeShape = new CANNON.Plane();
      phyxBase.addShape(planeShape);
    } else {
      debugger;
      phyxBase.addShape(phyxShape);
    }

    //attach shape to phyx


    //Tutaj trzeba dodac fizyczne "cialo" na ktorym sie odbywa manipulacja do swiata

    //default phyx values
    phyxBase.angularVelocity.set(0, 0, 0);

    phyxBase.angularDamping = 0.5;
    phyxBase.velocity.set(0,0,0);
    phyxBase.linearDamping = 0;

    phyxBase.position.set(...position);


    //phyxBase.quaternion.set(...position);
    return phyxBase;

  }

  /**
   * @desc build up a shape for physic object using CANNON
   * @param {object} phyxShapeType - shape of a physics
   */
  buildPhyxShape(phyxShapeType, position){

    let shape = new CANNON.Box();

    console.log(shape)
    return shape;

  }

  /**
   * @desc build up base physic object
   * @param {object} phyxType - type of physical body to build
   * @param {object} phyxProperties - set of properties
   */
  BuildBasicPhyx(phyxType, phyxProperties){

    let phyxBase = new CANNON[phyxType](phyxProperties);

    return phyxBase;
  }

}

//Creates new material Object
let mesh = new Mesh();

export default mesh;
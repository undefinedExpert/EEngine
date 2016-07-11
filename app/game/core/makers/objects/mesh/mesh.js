import THREE from 'three'; // 3D library
import CANNON from 'cannon'; // Physics Library
import helpers from './../../collectors/helpers';

//Import recipes object from ./recipe file.
import * as recipe from './recipes/recipe';

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
    create( type = 'basic', geometry, material, phyxType = 'Body', phyxShapeType = 'Body', phyxProperties = { mass: 0 }, position = [ 0, 0, 0 ], scene ) {
        const size = geometry.size;
        // Making sure it's uppercase
        phyxType = helpers.toTitleCase( phyxType );
        phyxShapeType = helpers.toTitleCase( phyxShapeType );

        // It build up visual mesh
        const fullyBuildedMesh = this.buildMesh( type, geometry, material, phyxType, position );

        // It attaches physics to mesh
        fullyBuildedMesh.phyx = this.buildPhyx( phyxType, phyxProperties, phyxShapeType, position, size );

        //
        fullyBuildedMesh.phyx.buildAABBMesh = this.buildAabbMesh( scene, geometry, size );
        return fullyBuildedMesh;
    }

    /**
     * @desc builds a material From MeshRecipe class
     * @param {string} type - Type of mesh, default value is 'basic'
     * @param {object} geometry - geometry of upcoming mesh
     * @param {object} material - material for that mesh
     * @param {object} phyxType - physical type for mesh
     * @param {object} position - physical type for mesh
     * @param {array} size - physical type for mesh
     * @return crafted mesh
     * @requires MeshRecipe Class - Default class for building meshes
     */
    buildMesh( type, geometry, material, phyxType, position ) {
        const obj = new recipe.MeshRecipe( type, geometry, material, phyxType );
        const crafted = obj.craft();

        crafted.position.x = position[ 0 ];
        crafted.position.y = position[ 1 ];
        crafted.position.z = position[ 2 ];
        return crafted;
    }

    /**
     * @desc builds a physical shape for a mesh
     * @param {string} phyxType - Type of physics to build
     * @param {object} phyxProperties - proporties for a base physics
     * @param {object} phyxShapeType - shape of a physics
     * @param {object} position - Default position of a phyx shape on scene
     * @param {object} size - Selected size of a physical shape
     * @return crafted physics of a mesh
     */
    buildPhyx( phyxType, phyxProperties, phyxShapeType, position, size ) {
        const phyxShape = this.buildPhyxShape( phyxShapeType, position, size );
        const phyxBase = this.BuildBasicPhyx( phyxType, phyxProperties );

        // TODO: Refactor (short it)
        if ( phyxShapeType === 'Plane' ) {
            let planeShape = new CANNON.Plane();
            phyxBase.addShape( planeShape );
        } else
            phyxBase.addShape( phyxShape );


        // TODO: Refactor default phyx values
        phyxBase.angularVelocity.set( 0, 0, 0 );
        phyxBase.angularDamping = 0.5;
        phyxBase.velocity.set( 0, 0, 0 );
        phyxBase.linearDamping = 0;
        phyxBase.position.set( ...position );

        return phyxBase;
    }

    /**
     * @desc build up a shape for physic object using CANNON
     * @param {object} phyxShapeType - shape of a physics
     */
    buildPhyxShape( phyxShapeType, position, size ) {
        let shape;

        //TODO: Refactor this to detect and use appropriate shape, like in ./geometries
        if ( phyxShapeType === 'Box' ) {
            let boxSize = _.map( [ ...size ], function ( n ) {
                return n * 0.5;
            } );
            shape = new CANNON[ phyxShapeType ]( new CANNON.Vec3( ...boxSize ) );
        }
        else if ( phyxShapeType === 'Cylinder' ) {
            shape = new CANNON.Cylinder( ...size );
            let q = new CANNON.Quaternion();
            q.setFromAxisAngle( new CANNON.Vec3( 1, 0, 0 ), Math.PI / 2 );
            shape.transformAllPoints( new CANNON.Vec3(), q );
        }
        else {
            shape = new CANNON[ phyxShapeType ]( ...size );
        }

        return shape;
    }

    /**
     * @desc Build up base for physical object
     * @param {object} phyxType - type of physical body to build
     * @param {object} phyxProperties - set of properties
     */
    BuildBasicPhyx( phyxType, phyxProperties ) {
        let phyxBase = new CANNON[ phyxType ]( phyxProperties );
        return phyxBase;
    }

    /**
     * @desc Build mesh for physical bodies (visualise them)
     * @param {object} scene - what scene
     * @param {object} geometry - custom geometry if needed
     * @param {object} size - size if needed
     * @return {object} GeometryCacheRecipe - It it used to compote AABB
     */
    buildAabbMesh( scene, geometry, size ) {
        var bboxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
        //TODO: Refactor default properties
        var bboxMaterial = new THREE.MeshBasicMaterial( {
            color: 0xdddddd,
            wireframe: true
        } );

        return new recipe.GeometryCacheRecipe( function () {
            return new THREE.Mesh( bboxGeometry, bboxMaterial );
        }, scene );
    }
}

// Create new Mesh Object
let mesh = new Mesh();

export default mesh;

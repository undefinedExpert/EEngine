/*
* This file is used to build all required objects, setup basic creation process, manipulation
* methods and all different stuff which will be accessable from each of the config/extend functions
* */

import * as api from '../makers/maker';
import CANNON from 'cannon'; // Physics Library
import Stats from 'stats.js';
import { Subject } from 'rx';

const classList = [];
//TODO: Refactor, split this file
class Core {
    constructor( classList ) {
        this.classList = classList;
        this.api = api;
        this.stats = new Stats();

        //Rendering
        this.objectsListToRender = [];
        this.observe = new Subject();
        this.renderObjectsToRender();
    };

    //Looks for specified method and runs a callback
    config( method, cb ) {
        const index = classList.indexOf( method );
        const classMethods = classList[ index + 1 ];
        //run method
        classMethods.classConfiguration( cb );
    }

    //Looks for specified method and runs a callback
    extend( method, cb ) {
        const index = classList.indexOf( method );
        const classMethods = classList[ index + 1 ];

        //run method
        classMethods.classExtender( cb );
    }

    //Subscribe this.objectsListToRender and when needed push render objects
    renderObjectsToRender() {
        let that = this;
        const subscription = this.observe.subscribe(
            function ( array ) {
                api.scene.add( array, 'mesh' );
                that.cannon( array );
                that.animate( array );
            },
            function ( e ) {
                console.log( 'onError: ' + e.message );
            },
            function () {
                subscription.dispose();
                console.log( 'onCompleted' );
            }
        );
    }

    /*
     * Those methods are used in other main classes
     * */
    classConfiguration( config ) {
        //set init to a config function
        this.init.apply( this, [ config ] ); //making avaiable this context in extend

        //call init with new config function
        this.init();
    }

    classExtender( value ) {
        let scope = this;
        value.apply( this, [ scope ] );
    }

    //Initialize base values
    init( config ) {
        if ( config ) {
            this.init = config;
            console.info( 'Config has been applied to a ' + this.constructor.name + ' Class' )
        }
    }

    /**
     * @method cannon
     * @desc Initialize whole physics for scene and it's objects
     */
    cannon( items ) {
        //Todo: refactor
        let that = this;
        that.world = new CANNON.World();
        that.world.gravity.set( 0, -10, 0 );
        that.world.broadphase = new CANNON.NaiveBroadphase();
        that.world.solver.iterations = 20;
        that.world.quatNormalizeSkip = 0;
        that.world.quatNormalizeFast = false;
        that.world.defaultContactMaterial.contactEquationStiffness = 1e7;
        that.world.defaultContactMaterial.contactEquationRelaxation = 4;
        that.world.doProfiling = true;

        var solver = new CANNON.GSSolver();
        solver.iterations = 7;
        solver.tolerance = 0.1;

        var split = true;
        if ( split )
            that.world.solver = new CANNON.SplitSolver( solver );
        else
            that.world.solver = solver;

        var physicsMaterial = new CANNON.Material( "slipperyMaterial" );

        // Adding physical body to "world", scene.
        var physicsContactMaterial = new CANNON.ContactMaterial( physicsMaterial, physicsMaterial, [ 0.1, 0.3 ] );

        // We must add the contact materials to the that.world
        that.world.addContactMaterial( physicsContactMaterial );
        that.world.solver.iterations = 20; // Increase solver iterations (default is 10)
        that.world.solver.tolerance = 0;   // Force solver to use all iterations

        // Add items.phyx to world
        items.forEach( function ( item ) {
            that.world.addBody( item.phyx );
        } )
    }

    /**
     * @function fpsUpdate
     * @desc Adds possibility to metric fps
     * @param {string} type - What kind of metric it will display as default
    */
    fpsUpdate( type ) {
        const types = [ 'fps', 'ms', 'mb', 'custom' ];
        let selectedType = types.indexOf( type );
        this.stats.showPanel( selectedType ); // 0: fps, 1: ms, 2: mb, 3+: custom
        window.document.body.appendChild( this.stats.dom );
    }

    /**
     * @function animate
     * @desc Updates all required function which every sec
     */
    animate() {
        this.stats.begin();
        requestAnimationFrame( this.animate.bind( this, this.objectsListToRender ) );
        this.updatePhysics( this.objectsListToRender );
        this.render();
        this.stats.end();
    }

    /**
     * @function updatePhysics
     * @desc Updates physic
     * @param {array} items - Update and create each phyx item in scene.
     */
    updatePhysics( items ) {
        // Step the physics world
        var timeStep = 1 / 60;
        this.world.step( timeStep );

        //Tutaj dodajemy powloke (mesh) obiektu ktorym chcemy manipulowac
        items.forEach( function ( item, that ) {
            item.mesh.position.copy( item.phyx.position );
            item.mesh.quaternion.copy( item.phyx.quaternion );

            //ComputeAABB for each mesh
            item.phyx.buildAABBMesh.restart();
            if ( item.phyx.computeAABB ) {

                if ( item.phyx.aabbNeedsUpdate ) {
                    item.phyx.computeAABB();
                }

                if ( isFinite( item.phyx.aabb.lowerBound.x ) && isFinite( item.phyx.aabb.lowerBound.y ) && isFinite( item.phyx.aabb.lowerBound.z ) && isFinite( item.phyx.aabb.upperBound.x ) && isFinite( item.phyx.aabb.upperBound.y ) && isFinite( item.phyx.aabb.upperBound.z ) && item.phyx.aabb.lowerBound.x - item.phyx.aabb.upperBound.x != 0 && item.phyx.aabb.lowerBound.y - item.phyx.aabb.upperBound.y != 0 && item.phyx.aabb.lowerBound.z - item.phyx.aabb.upperBound.z != 0 ) {

                    let mesh = item.phyx.buildAABBMesh.request();
                    mesh.scale.set( item.phyx.aabb.lowerBound.x - item.phyx.aabb.upperBound.x,
                        item.phyx.aabb.lowerBound.y - item.phyx.aabb.upperBound.y,
                        item.phyx.aabb.lowerBound.z - item.phyx.aabb.upperBound.z );
                    mesh.position.set( (item.phyx.aabb.lowerBound.x + item.phyx.aabb.upperBound.x) * 0.5,
                        (item.phyx.aabb.lowerBound.y + item.phyx.aabb.upperBound.y) * 0.5,
                        (item.phyx.aabb.lowerBound.z + item.phyx.aabb.upperBound.z) * 0.5 );
                }
            }
            item.phyx.buildAABBMesh.hideCached();
        } );

    }

    /**
     * @function render
     * @desc Render whole scene and camera
     */
    render() {
        this.renderer.render( this.scene, this.camera );
    }

    /**
     * @function object
     * @desc Render whole scene and camera
     * @param {object} props - Define default object, create a mesh, physical bodies from specified props.
     * @return {object} Returns mesh container which includes physical and mesh bodies.
     */
    object( props ) {
        //Default props
        let defaultProps = {
            geoType: props.geoType || 'Box',
            geoSize: props.geoSize || 'small',
            materialType: props.materialType || 'basic',
            materialProps: props.materialProps || { color: 0xff0000 },
            flipX: props.flipX || false,
            meshType: props.meshType || 'basic',
            meshName: props.meshName || error( 'set a property name of this object: ' + props ),
            phyxName: props.meshName + 'phyx',
            phyxType: props.phyxType || 'Body',
            phyxShapeType: props.geoType || 'Box',
            phyxBodyTypeParameters: props.phyxBodyTypeParameters || { mass: 1 },
            position: props.position || [ 0, 0, 0 ],
            manipulation: props.manipulation,
            shadow: props.shadow || { cast: true, receive: true }
        };

        // default value for manipulation
        defaultProps.manipulation = typeof props.manipulation === 'object' || typeof defaultProps.manipulation === 'function' ? defaultProps.manipulation : {
            mesh: function () {
            }, phyx(){
            }
        };

        // init materials to build mesh
        let container = {};
        // let box = make.geometry(defaultProps.geoType, defaultProps.geoSize);
        let geometry = api.geometry.create( defaultProps.geoType, defaultProps.geoSize );

        //Build up a material for upcoming object
        let material = api.material.create( defaultProps.materialType, defaultProps.materialProps );

        // building up mesh from options
        props.meshName = api.mesh.create( defaultProps.meshType, geometry, material, defaultProps.phyxType, defaultProps.phyxShapeType, defaultProps.phyxBodyTypeParameters, defaultProps.position, this.scene );

        // Freshly object manipulation, adding shadows and at future more.
        // if set to recive shadow
        props.meshName.receiveShadow = defaultProps.shadow.receive;

        //if set to cast shadow
        props.meshName.castShadow = defaultProps.shadow.cast;

        //mesh manipulation callback
        if ( typeof defaultProps.manipulation !== 'function' ) {
            defaultProps.manipulation.mesh( props.meshName );
        }

        // attaching mesh to returned object
        container.mesh = props.meshName;

        if ( defaultProps.flipX === true ) {
            let phyx = props.meshName.phyx;
            phyx.quaternion.setFromAxisAngle( new CANNON.Vec3( 1, 0, 0 ), -Math.PI / 2 );
            phyx.position.set( 0, 0, 0 );
        }

        //Adding phyx to this mesh
        defaultProps.phyxName = props.meshName.phyx; //init phyx for this object

        //phyx manipulation callback
        if ( typeof defaultProps.manipulation !== 'function' ) {
            defaultProps.manipulation.phyx( defaultProps.phyxName ); //Phyx manipulation callback
        }

        //Dodawanie phyx do proporcji zwrotnych
        container.phyx = defaultProps.phyxName;
        if ( typeof defaultProps.manipulation === 'function' ) {
            defaultProps.manipulation( container.mesh, container.phyx );
        }

        //On error throw it.
        function error( txt ) {
            throw(txt);
        }

        //return object mesh with phyx
        return container;
    }
}

//Scener extends our 'view'
//TODO: Remove from this file
class Scener extends Core {
    constructor() {
        super();
        classList.push( 'Scener', this );
        this.init();
    }
}

// Composer class should be used to manipulate all kind of different objects, create or remove them
//TODO: Remove from this file
class Composer extends Core {
    constructor() {
        super();
        classList.push( 'Composer', this );
        this.init();
    }

    addMovement( element, key, force ) {
        let velocity = element.phyx.velocity;

        switch ( key ) {
            case 'left':
                velocity = velocity.set( force, 0, 0 );
                break;
            case 'right':
                velocity = velocity.set( -force, 0, 0 );
                break;
            case 'up':
                velocity = velocity.set( 0, 0, force );
                break;
            case 'down':
                velocity = velocity.set( 0, 0, force );
                break;
            case 'jump':
                velocity = velocity.set( 0, force, 0 );
                break;

        }

    }
}

var core = new Core( classList );
var scener = new Scener();
var composer = new Composer();

export {
    core as demoCore,
    scener as demoScenery
}


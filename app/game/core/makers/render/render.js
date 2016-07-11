import THREE from 'three'; // 3D library

/**
 * @desc Placing scene object into application
 * @function scene()
 */

class Render {
    constructor( camera, scene, renderProps = '' ) {
        this.camera = camera;
        this.props = renderProps;
        this.scene = scene;
    }

    /**
       * @desc Creating Three.js render object
       * @function create()
     * @return render object
     */
    create( camera, scene, renderProps ) {
        //Create render three.js object
        render = new THREE.WebGLRenderer( renderProps );
        //Setting props to camera
        this.setRenderOptions( camera, scene );
        //Append camera at DOM
        document.body.appendChild( render.domElement );
        //return render three.js object
        return render;
    }

    /**
     * @desc Manipulate render settings, setup some defaults properties
     * @function setRenderOptions()
     * TODO: Refactor this
     */
    setRenderOptions( camera, scene ) {

        //General Settings of Render
        render.setSize( window.innerWidth, window.innerHeight );
        render.setClearColor( scene.fog.color );

        //Camera settings
        render.shadowCameraNear = camera.near;
        render.shadowCameraFar = camera.far;
        render.shadowCameraFov = camera.fov;

        //Shadow Settings
        render.shadowMap.enabled = true;
        render.shadowMapSoft = true;
        render.shadowMap.type = THREE.PCFSoftShadowMap;

        render.shadowMapBias = 0.0039;
        render.shadowMapDarkness = 0.5;
        render.shadowMapWidth = 4096;
        render.shadowMapHeight = 4096;
    }
}

let render = new Render();

export default render;

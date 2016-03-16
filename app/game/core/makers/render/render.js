import THREE from 'three.js'; // 3D library
import CANNON from 'cannon'; // Physics Library
/**
   * @desc Placing scene object into application
   * @function scene()
   * //FIXME: fix selecting camera rather then from create method make it from constructor
 */
class Render {

  constructor(camera, renderProps='') {
    render = this.render;
    this.camera = camera;
    this.props = renderProps;
  }

  /**
     * @desc Creating Three.js render object
     * @function create()
     * @return render object
   */
  create(camera, renderProps) {

    //Create render three.js object

    render = new THREE.WebGLRenderer(renderProps);

    //Setting props to camera
    this.setRenderOptions(camera);

    //Append camera at DOM
    document.body.appendChild(render.domElement);

    //return render three.js object
    return render;
  }

  /**
     * @desc Manipulate render settings
     * @function setRenderOptions()
   */
  setRenderOptions(camera){

    //General Settings of Render
    render.setSize(window.innerWidth, window.innerHeight);
    render.setClearColor(0x5081B5);
    render.setPixelRatio( window.devicePixelRatio );


    //Camera settings
    render.shadowCameraNear = camera.near;
    render.shadowCameraFar = camera.far;
    render.shadowCameraFov = camera.fov;

    //Shadow Settings
    render.shadowMap.enabled = true;

    render.shadowMap.type = THREE.PCFSoftShadowMap;
    render.shadowMapBias = 0.0039;
    render.shadowMapDarkness = 0.5;
    render.shadowMapWidth = 2048;
    render.shadowMapHeight = 2048;

  }
}

let render = new Render();

export default render;
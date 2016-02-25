/**
 * This file has been created by Emanuel Slotwinski on 2016-02-25
 */
function render() {
  render = new THREE.WebGLRenderer( { antialias: true } );
  render.setSize(window.innerWidth, window.innerHeight);
  render.shadowMap.enabled = true;
  render.setClearColor(0x5081B5);


  render.shadowMapSoft = true;

  render.shadowCameraNear = 3;
  render.shadowCameraFar = camera.far;
  render.shadowCameraFov = 50;

  render.shadowMapBias = 0.0039;
  render.shadowMapDarkness = 0.5;
  render.shadowMapWidth = 1024;
  render.shadowMapHeight = 1024;


  document.body.appendChild(render.domElement);
  return render;
}
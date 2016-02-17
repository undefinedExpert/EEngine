/**
 * This file has been created by Emanuel Slotwinski on 2016-02-17
 */

/*
* Task list what this file should do?
* 1. It should contain information about settings of our methods, like color of the directional light and so?
*
*
* */
var config = {
      init: {
            scene: {
                  add: function(sceneName){
                        var scene = new THREE.Scene();
                        return scene;
                  },
                  light: {
                      directional: function(color, position){
                            var directionalLight = new THREE.DirectionalLight('0x' + color);
                            directionalLight.position.set(0, 0, 1).normalize();
//                            scene.add(directionalLight);
                      }
                  }
            }
      }
};


export default config;

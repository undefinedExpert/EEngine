/**
   * @desc Placing light object into application
   * @class Light
 //TODO: poprawa komentarzy
 */
class Helpers {

  constructor() {}

  /**
     * @desc Creating Three.js light
     * @function create()
   * @return new Three.js light
   * //TODO: Adding more lights
   */
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

}

let helpers = new Helpers();

export default helpers;



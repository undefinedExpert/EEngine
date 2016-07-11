
class Helpers {
  constructor() {}
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

}

let helpers = new Helpers();

export default helpers;



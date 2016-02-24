/** Class representing a GameObject. */
  //TODO: Stworzenie klasy ktora bedzie przypisana do jakies gruby obiektow
class GameObjects {
  /**
   * Create a GameObject.
   */
  constructor(props) {
    this.name = name;

    this.props = {
      geoType: 'box',
      geoSize: 'low',
      materialType: 'basic',
      materialProps: {
        wireframe: false
      },
      meshType: 'basic',
      meshName: 'object2',
      phyxName: 'object2Phyx'
    };

    this.props = props;
  }


}

export {
/**
 * Get the red, green, and blue values of a color.
 * @function
 * @param {string} color - A color, in hexidecimal format.
 * @returns {Array.} An array of the red, green, and blue values,
 * each ranging from 0 to 255.
 */
  GameObjects as GameObjects
}

//Usage sample, still not included in project
//newObject.props = {
//  geoType: 'box',
//  geoSize: 'small',
//  materialType: 'basic',
//  materialProps: {
//    wireframe: false
//  },
//  meshType: 'basic',
//  phyxName: 'siemanko1'
//
//};
//
//var obiekty = this.object(newObject.props);
/**
 * This file has been created by Emanuel Slotwinski on 2016-02-25
 */
/**
   * @desc Material creator function
   * @function material
 * @param {string} type - type of material
 * @param {object} properties - Proporties of a material
   * @return bool - object
 */
function material(type = 'basic', properties = {wireframe: true}) {
//TODO: Adding more base materials
  //Base materials which are use to create new objects from classes
  var materials = {
    "basic": function () {
      return new Material(type, properties);
    },
    "depth": function () {
      return new Material(type, properties);
    },
    "lambert": function(){
      return new Material(type, properties);
    },
    "phong": function(){
      return new Material(type, properties);
    }
  };

  //Main class
  class Material {
    /**
     * @desc Default constructor of material
     * @param {string} type - Type of selected shape
     * @param {object} properties - Type of selected size
     */
    constructor(type, properties) {
      type = toTitleCase(type);
      this.type = type;
      this.properties = properties;
    }


    craft(properties) {
      //console.log(new THREE['Mesh' + this.type + 'Material']({wireframe: true}));
      //Properties are from Constructor
      return new THREE[['Mesh' + this.type + 'Material']](properties);
    }

  }

  //Setting specific type with properties to materials
  var material = materials[type](type, properties);

  //Creating material
  let craftedMaterial = material.craft.apply(material, [properties]);

  //Returning material
  return craftedMaterial;
}
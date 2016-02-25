/**
 * This file has been created by Emanuel Slotwinski on 2016-02-25
 */
/**
  * @desc Placing camera into scene
  * @function camera
 * @param {object} position - set initial position of the camera
 * @param {number} fov - camera Field of View value
  * @return bool - camera object
 */
//TODO: mesh comment


function mesh(type, object, material, phyxType='Box') {


  var meshes = {
    basic: function () {
      return new Mesh(type, object, material, phyxType);
    }
  };

  class Mesh {
    /**
     * @desc Default constructor of material
     * @param {string} type - Type of selected shape
     * @param {object} properties - Type of selected size
     */
    constructor(type, object, material, phyxType) {
      type = toTitleCase(type);
      this.type = type;
      this.object = object;
      this.material = material;
      this.phyxType = phyxType;

    }


    craft(type, object, material) {
      //console.log(new THREE['Mesh' + this.type + 'Material']({wireframe: true}));
      //Properties are from Constructor
      return new THREE.Mesh(object, material);
    }

    shape() {
      console.log(this);
      this.shape = new CANNON[phyxType](new CANNON.Vec3(1, 1, 1));

      return this.shape;


    }
    //init(name, bodyType='Body', parameters={mass: 1}) {
    //  name = new CANNON.Body(parameters);
    //  //new CANNON.RigidBody(0,groundShape,groundMaterial)
    //  console.log(this.shape());
    //
    //
    //  name.shape = this.shape();
    //
    //  name.angularVelocity.set(0, 0, 0);
    //
    //  name.angularDamping = 0.5;
    //
    //  return name;
    //}

  }


  var mesh = meshes[type](type, object, material, phyxType);
  var craftedMesh = mesh.craft.apply(Mesh, [type, object, material]);

  craftedMesh.construct = {
    shape: function (phyxType) {

      this.shape = new CANNON[phyxType](new CANNON.Vec3(1, 1, 1));
      return this.shape;
    },
    mass: 1,
    init: function (name, bodyType='Body', bodyTypeProperties={mass: 1}, phyxType='Body') {


      name = new CANNON[bodyType](bodyTypeProperties);
      //CANNON.RigidBody(0,groundShape,groundMaterial);
      name.shape = this.shape(phyxType);

      name.angularVelocity.set(0, 0, 0);

      name.angularDamping = 0.5;

      return name;
    }

  };

  //Returning material

  return craftedMesh;


}

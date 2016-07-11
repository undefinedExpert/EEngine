/**
 * @desc This class is used to build and compute AABB Border of each mesh. AABB - https://en.wikipedia.org/wiki/Bounding_volume
 * @class GeometryCacheRecipe
 */
class GeometryCacheRecipe {
    constructor( createFunc, scene ) {
        this.that = this;
        this.geometries = [];
        this.gone = [];
        this.geo;
        this.createFunc = createFunc;
        this.scene = scene;
    }

    request() {
        if ( this.geometries.length ) {
            this.geo = this.geometries.pop();
        } else {
            this.geo = this.createFunc();
        }
        //todo: make current scene function to make an usage in here
        this.scene.add( this.geo );
        this.gone.push( this.geo );
        return this.geo;
    };

    restart() {
        while ( this.gone.length ) {
            this.geometries.push( this.gone.pop() );
        }
    };

    hideCached() {
        for ( var i = 0; i < this.geometries.length; i++ ) {
            //scene.remove(geometries[i]);
        }
    };
}

export default GeometryCacheRecipe;

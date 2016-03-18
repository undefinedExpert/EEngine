//Ta klasa to kontener dla naszych metod
import * as $ from 'jquery';
import * as api from '../makers/maker';


//Kontener
var classList = [];

class Core {
  constructor(classList){
    this.classList = classList;
    this.api = api;


  };

  //Looks for specified method and runs a callback
  config(method, cb){

    var index = classList.indexOf(method),
        classMethods = classList[index + 1];

    //run method
    classMethods.classConfiguration(cb);
  }

  //Looks for specified method and runs a callback
  extend(method, cb){

    var index = classList.indexOf(method),
        classMethods = classList[index + 1];

    //run method
    classMethods.classExtender(cb);
  }

  log(string){
    return console.log(string);
  }
  modify(){
    //...tutaj modifikujemy nasze metody ktore sa juz w naszej funkcji core
  }

  /*
  *
  * Those methods are used in other main classes
  *
  * */

  //Value - callback
  classConfiguration(config){
    //set init to a config function
    this.init.apply(this, [config]); //making avalible this context in extend

    //call init with new config function
    this.init();
  }

  //Value - callback
  classExtender(value){
    value.apply(this, []); //making avalible this context in extend
    this.init();
  }

  //inicializuje domyslne wartosci ktorymi bedziemy potem manipulowac
  init(config){
    //jakas domyslna wartosc
    if(config){
      this.init = config;
      console.info('Config has been applied to a ' + this.constructor.name + ' Class')
    }
  }




}

//klasa metody core, jest to glowna klasa ktora rozszerza nasz "widok"
class Scener extends Core {
  constructor(){
    super();
    classList.push('Scener', this);
    this.init();
  }



}

//klasa metody core, jest to glowna klasa ktora rozszerza nasz "widok"
class Composer extends Core {
  constructor(){
    super();
    classList.push('Composer', this);
    this.init();
  }

}







var core = new Core(classList);
var scener = new Scener();
var composer = new Composer();



export {
  core as demoCore,
  scener as demoScenery
}


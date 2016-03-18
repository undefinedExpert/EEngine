//Ta klasa to kontener dla naszych metod
import * as $ from 'jquery';

//Methoda i jej template
var scenertemp = {name: 'Scener', value: {}};

//Kontener
var classList = [];

class Core {
  constructor(classList){
    this.classList = classList;
  };

  extend(method, cb){

    var index = classList.indexOf(method),
        classMethods = classList[index + 1];

    classMethods.extend(cb);

    //this.classList[method].extend(cb);
  }
  modify(){
    //...tutaj modifikujemy nasze metody ktore sa juz w naszej funkcji core
  }
}

//klasa metody core
class Scener extends Core {
  constructor(){
    super();
    classList.push('Scener', this);
    this.init();

  }

  init(){
    this.siemanko = this.siemanko || 'siema';
    console.log(this.siemanko);
  }

  light(){
    return 'light';
  }


  extend(value){
    value.apply(this, []); //making avalible this context in extend
  }
}


var core = new Core(classList);

var scener = new Scener();



export {
  core as demoCore,
  scener as demoScenery
}


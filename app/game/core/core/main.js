//Ta klasa to kontener dla naszych metod


//Methoda i jej template
var scenertemp = {name: 'Scener', value: {}};

//Kontener
var classList = [scenertemp.name];
var classValues = [scenertemp.value];

class Core {
  constructor(classList, classValues){
    //... Lista metod ktore sa dostepne w tej klasie?
    this.classList = classList;
    this.classValues = classValues;

    let collection = new WeakSet();
    this.collection = collection;

    if(typeof classList !== 'undefined'){
      var value = classValues[0];
      collection.add(value);
    }


  };

  extend(method, cb){
   //...tutaj rozszerzamy jakas metode ktora rozszerza ta klase
   //do jakich innych zmiennych mamy dostep z tego miejsca?
   // method = method.toLowerCase();
   // var methodIndex = this.classList.indexOf('Scener');
   // var methodValue = methodIndex > -1 ? this.classValues[methodIndex] : console.error('does not exist in classList');
   //
   //console.log(this.collection[methodValue]);



  }
  modify(){
    //...tutaj modifikujemy nasze metody ktore sa juz w naszej funkcji core
  }
}

//klasa metody core
class Scener extends Core {
  constructor(){
    super();
  }

  extend(value){
    value();
  }
}





var core = new Core(classList, classValues);

var scener = new Scener();



export {
  core as demoCore,
  scener as demoScenery
}
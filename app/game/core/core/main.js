//Ta klasa to kontener dla naszych metod
class Core {
  constructor(){
    //... Lista metod ktore sa dostepne w tej klasie?
  };

  extend(){
   //...tutaj rozszerzamy jakas metode ktora rozszerza ta klase
   //do jakich innych zmiennych mamy dostep z tego miejsca?
  }
  modify(){
    //...tutaj modifikujemy nasze metody ktore sa juz w naszej funkcji core
  }
}



class Scener extends Core {
  constructor(){
    super();
  }
}

export {
  Core as demoCore,
  Scener as demoScenery
}
const carPrototype = {
    drive() {
      return `🚗 Їде автомобіль марки ${this.brand}`;
    }
  };

  function createCar(brand) {
    const car = Object.create(carPrototype);
    car.brand = brand;
    return car;
  }

  function runPrototype() {
    const audi = createCar("Audi");
    const bmw = createCar("BMW");

    const output =
      audi.drive() + "\n" +
      bmw.drive();

    document.getElementById("prototypeOutput").textContent = output;
  }
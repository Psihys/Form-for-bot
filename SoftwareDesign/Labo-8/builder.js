class HouseBuilder {
    constructor() {
      this.house = {};
    }
    setWalls(walls) {
      this.house.walls = walls;
      return this;
    }
    setRoof(roof) {
      this.house.roof = roof;
      return this;
    }
    setWindows(count) {
      this.house.windows = count;
      return this;
    }
    build() {
      return this.house;
    }
  }

  function runBuilder() {
    const villa = new HouseBuilder()
      .setWalls("цегляні")
      .setRoof("черепичний")
      .setWindows(8)
      .build();
    document.getElementById("builderOutput").textContent =
      JSON.stringify(villa, null, 2);
  }

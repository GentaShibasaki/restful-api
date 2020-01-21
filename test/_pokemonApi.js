const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
chai.should();

/*
 * This sprint you will have to create all tests yourself, TDD style.
 * For this you will want to get familiar with chai-http https://www.chaijs.com/plugins/chai-http/
 * The same kind of structure that you encountered in lecture.express will be provided here.
 */
const server = setupServer();
describe("Pokemon API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  describe("GET /api/pokemon - returning pokemon", () => {
    it("should return all pokemon", async () => {
      const res = await request.get("/api/pokemon");

      res.should.be.json;
    });
    it("should return 3 pokemon", async () => {
      const res = await request.get("/api/pokemon").query({ limit: "3" });
      const expected = [
        {
          id: "001",
          name: "Bulbasaur",
          classification: "Seed Pokémon",
          types: ["Grass", "Poison"],
          resistant: ["Water", "Electric", "Grass", "Fighting", "Fairy"],
          weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
          weight: {
            minimum: "6.04kg",
            maximum: "7.76kg",
          },
          height: {
            minimum: "0.61m",
            maximum: "0.79m",
          },
          fleeRate: 0.1,
          evolutionRequirements: {
            amount: 25,
            name: "Bulbasaur candies",
          },
          evolutions: [
            {
              id: 2,
              name: "Ivysaur",
            },
            {
              id: 3,
              name: "Venusaur",
            },
          ],
          maxCP: 951,
          maxHP: 1071,
          attacks: {
            fast: [
              {
                name: "Tackle",
                type: "Normal",
                damage: 12,
              },
              {
                name: "Vine Whip",
                type: "Grass",
                damage: 7,
              },
            ],
            special: [
              {
                name: "Power Whip",
                type: "Grass",
                damage: 70,
              },
              {
                name: "Seed Bomb",
                type: "Grass",
                damage: 40,
              },
              {
                name: "Sludge Bomb",
                type: "Poison",
                damage: 55,
              },
            ],
          },
        },
        {
          id: "002",
          name: "Ivysaur",
          classification: "Seed Pokémon",
          types: ["Grass", "Poison"],
          resistant: ["Water", "Electric", "Grass", "Fighting", "Fairy"],
          weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
          weight: {
            minimum: "11.38kg",
            maximum: "14.63kg",
          },
          height: {
            minimum: "0.88m",
            maximum: "1.13m",
          },
          fleeRate: 0.07,
          "Previous evolution(s)": [
            {
              id: 1,
              name: "Bulbasaur",
            },
          ],
          evolutionRequirements: {
            amount: 100,
            name: "Bulbasaur candies",
          },
          evolutions: [
            {
              id: 3,
              name: "Venusaur",
            },
          ],
          maxCP: 1483,
          maxHP: 1632,
          attacks: {
            fast: [
              {
                name: "Razor Leaf",
                type: "Grass",
                damage: 15,
              },
              {
                name: "Vine Whip",
                type: "Grass",
                damage: 7,
              },
            ],
            special: [
              {
                name: "Power Whip",
                type: "Grass",
                damage: 70,
              },
              {
                name: "Sludge Bomb",
                type: "Poison",
                damage: 55,
              },
              {
                name: "Solar Beam",
                type: "Grass",
                damage: 120,
              },
            ],
          },
        },
        {
          id: "003",
          name: "Venusaur",
          classification: "Seed Pokémon",
          types: ["Grass", "Poison"],
          resistant: ["Water", "Electric", "Grass", "Fighting", "Fairy"],
          weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
          weight: {
            minimum: "87.5kg",
            maximum: "112.5kg",
          },
          height: {
            minimum: "1.75m",
            maximum: "2.25m",
          },
          fleeRate: 0.05,
          "Previous evolution(s)": [
            {
              id: 1,
              name: "Bulbasaur",
            },
            {
              id: 2,
              name: "Ivysaur",
            },
          ],
          maxCP: 2392,
          maxHP: 2580,
          attacks: {
            fast: [
              {
                name: "Razor Leaf",
                type: "Grass",
                damage: 15,
              },
              {
                name: "Vine Whip",
                type: "Grass",
                damage: 7,
              },
            ],
            special: [
              {
                name: "Petal Blizzard",
                type: "Grass",
                damage: 65,
              },
              {
                name: "Sludge Bomb",
                type: "Poison",
                damage: 55,
              },
              {
                name: "Solar Beam",
                type: "Grass",
                damage: 120,
              },
            ],
          },
        },
      ];
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(expected);
    });
  });

  describe("POST /api/pokemon - adding pokemon", () => {
    it("should add pokemon to pokemon.json", async () => {
      // define a sample data

      const newPokemon = {
        id: "152",
        name: "Genta",
        classification: "Seed Pokémon",
        types: ["Grass", "Poison"],
        resistant: ["Water", "Electric", "Grass", "Fighting", "Fairy"],
        weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
        weight: {
          minimum: "6.04kg",
          maximum: "7.76kg",
        },
        height: {
          minimum: "0.61m",
          maximum: "0.79m",
        },
        fleeRate: 0.1,
        evolutionRequirements: {
          amount: 25,
          name: "Bulbasaur candies",
        },
        evolutions: [
          {
            id: 2,
            name: "Ivysaur",
          },
          {
            id: 3,
            name: "Venusaur",
          },
        ],
        maxCP: 951,
        maxHP: 1071,
        attacks: {
          fast: [
            {
              name: "Tackle",
              type: "Normal",
              damage: 12,
            },
            {
              name: "Vine Whip",
              type: "Grass",
              damage: 7,
            },
          ],
          special: [
            {
              name: "Power Whip",
              type: "Grass",
              damage: 70,
            },
            {
              name: "Seed Bomb",
              type: "Grass",
              damage: 40,
            },
            {
              name: "Sludge Bomb",
              type: "Poison",
              damage: 55,
            },
          ],
        },
      };

      const res = await request.post("/api/pokemon").send(newPokemon);
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(newPokemon);
    });
  });

  describe("GET /api/pokemon/:id - return pokemon", () => {
    it("should return pokemon that id is the same", async () => {
      const res = await request.get("/api/pokemon/042");
      res.should.be.json;
      // JSON.parse(res.text).should.deep.equal({ sample: "sample" });
    });
  });

  describe("GET /api/pokemon/:name - return pokemon", () => {
    it("should return pokemon that name is the same", async () => {
      const res = await request.get("/api/pokemon/Mew");
      // console.log(res.text);
      // res.should.be.json;
      // JSON.parse(res.text).should.deep.equal({ sample: "sample" });
    });
  });

  describe("PATCH /api/pokemon/:idOrName - make partial modifications to a Pokemon", () => {
    it("should change pokemon's attributes that name or id is the same", async () => {
      const res = await request.patch("/api/pokemon/42").query({
        name: "Genta",
        classification: "human",
        "Previous evolution(s)": [{ id: 155, name: "Takuya" }],
      });
      // console.log(res.text);
      // res.should.be.json;
      // JSON.parse(res.text).should.deep.equal({ sample: "sample" });
    });
  });

  describe("GET /api/pokemon/:idOrName/evolutions - get evolutions", () => {
    it("should get pokemon's evolutions", async () => {
      const res = await request.get("/api/pokemon/Staryu/evolutions");
      // console.log(res.text);
      // res.should.be.json;
      // JSON.parse(res.text).should.deep.equal({ sample: "sample" });
    });
  });

  describe("GET /api/types - get types", () => {
    it("should get pokemon's types", async () => {
      const res = await request.get("/api/types").query({ limit: "3" });
      // console.log(res.text);
      // res.should.be.json;
      // JSON.parse(res.text).should.deep.equal({ sample: "sample" });
    });
  });

  describe("POST /api/types - adding types", () => {
    it("should add types", async () => {
      // define a sample data

      const newTypes = { types: ["human", "alien"] };

      const res = await request.post("/api/types").send(newTypes);
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(newTypes);
    });
  });

  describe("DELETE /api/types/:name - delete types", () => {
    it("should delete types", async () => {
      // define a sample data
      const res = await request.delete("/api/types/Grass");
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal();
    });
  });

  describe("GET /api/types/:type/pokemon - select pokemon", () => {
    it("should select pokemon that has the same type", async () => {
      // define a sample data
      const res = await request.get("/api/types/Grass/pokemon");
      res.should.be.json;
      // JSON.parse(res.text).should.deep.equal();
    });
  });

  describe("GET /api/attacks/:name/pokemon - select pokemon", () => {
    it("should select pokemon that has the same attacks name", async () => {
      // define a sample data
      const res = await request.get("/api/attacks/Vine Whip/pokemon");
      res.should.be.json;
      // JSON.parse(res.text).should.deep.equal();
    });
  });

  describe("POST /api/attacks/fast - add an attack", () => {
    it("should add an attack", async () => {
      // define a sample data
      const res = await request.post("/api/attacks/fast").send({
        name: "Tackle",
        type: "Normal",
        damage: 12,
      });
      res.should.be.json;
      // JSON.parse(res.text).should.deep.equal();
    });
  });

  describe("PATCH /api/attacks/:name - make partial modifications to a Pokemon", () => {
    it("should modifies specified attack", async () => {
      const res = await request.patch("/api/attacks/Tackle").query({
        name: "Tackle",
        type: "Special",
        damage: 1000,
      });
      res.should.be.json;
      // console.log(res.text);
      // res.should.be.json;
      // JSON.parse(res.text).should.deep.equal({ sample: "sample" });
    });
  });
});

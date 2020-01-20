const pokeData = require("./data");
const express = require("express");

const setupServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
  const app = express();

  app.get("/api/pokemon", (req, res) => {
    // console.log(pokeData.pokemon);
    if (!req.query.limit) {
      res.send(pokeData.pokemon);
    } else {
      const result = [];
      for (let i = 0; i < Number(req.query.limit); i++) {
        result.push(pokeData.pokemon[i]);
      }
      // console.log(result);
      res.send(result);
    }
  });
  app.use(express.json());

  app.post("/api/pokemon", (req, res) => {
    // console.log(pokeData.pokemon.length); // 152 => second time 153
    // pokeData.pokemon.push(req.body);
    res.send(req.body);
  });

  app.get("/api/pokemon/:id", (req, res) => {
    const id = Number(req.params.id);
    let result = "Nothing";
    for (let i = 0; i < pokeData.pokemon.length; i++) {
      if (id === Number(pokeData.pokemon[i].id)) {
        result = pokeData.pokemon[i];
        break;
      }
    }
    res.send(result);
  });

  app.get("/api/pokemon/:name", (req, res) => {
    console.log(req);
  });
  return app;
};

module.exports = { setupServer };

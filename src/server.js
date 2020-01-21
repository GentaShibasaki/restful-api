const pokeData = require("./data");
const express = require("express");

const setupServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
  const app = express();

  app.use(express.json());

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

  app.post("/api/pokemon", (req, res) => {
    pokeData.pokemon.push(req.body);
    res.send(req.body);
  });

  app.get("/api/pokemon/:idOrName", (req, res) => {
    let id, name;
    let result = "Nothing";
    Number(req.params.idOrName)
      ? (id = Number(req.params.idOrName))
      : (name = req.params.idOrName.toUpperCase());
    if (id) {
      for (let i = 0; i < pokeData.pokemon.length; i++) {
        if (id === Number(pokeData.pokemon[i].id)) {
          result = pokeData.pokemon[i];
          break;
        }
      }
    } else {
      for (let i = 0; i < pokeData.pokemon.length; i++) {
        if (name === pokeData.pokemon[i].name.toUpperCase()) {
          result = pokeData.pokemon[i];
          break;
        }
      }
    }
    res.send(result);
  });

  app.patch("/api/pokemon/:idOrName", (req, res) => {
    let id, name;
    let result = "Nothing";
    Number(req.params.idOrName)
      ? (id = Number(req.params.idOrName))
      : (name = req.params.idOrName.toUpperCase());
    if (id) {
      for (let i = 0; i < pokeData.pokemon.length; i++) {
        if (id === Number(pokeData.pokemon[i].id)) {
          result = pokeData.pokemon[i];
          break;
        }
      }
    } else {
      for (let i = 0; i < pokeData.pokemon.length; i++) {
        if (name === pokeData.pokemon[i].name.toUpperCase()) {
          result = pokeData.pokemon[i];
          break;
        }
      }
    }
    const tmp = Object.getOwnPropertyNames(req.query);
    for (let i = 0; i < tmp.length; i++) {
      result[tmp[i]] = req.query[tmp[i]];
    }
    res.send(result);
  });

  app.delete("/api/pokemon/:idOrName", (req, res) => {
    let id, name;
    let result = "Nothing";
    Number(req.params.idOrName)
      ? (id = Number(req.params.idOrName))
      : (name = req.params.idOrName);
    if (id) {
      for (let i = 0; i < pokeData.pokemon.length; i++) {
        if (id === Number(pokeData.pokemon[i].id)) {
          result = pokeData.pokemon[i];
          pokeData.pokemon.splice(i, 1);
          break;
        }
      }
    } else {
      for (let i = 0; i < pokeData.pokemon.length; i++) {
        if (name === pokeData.pokemon[i].name) {
          result = pokeData.pokemon[i];
          pokeData.pokemon.splice(i, 1);
          break;
        }
      }
    }
    res.send(result);
  });

  app.get("/api/pokemon/:idOrName/evolutions", (req, res) => {
    let id, name;
    let result;
    Number(req.params.idOrName)
      ? (id = Number(req.params.idOrName))
      : (name = req.params.idOrName.toUpperCase());
    if (id) {
      for (let i = 0; i < pokeData.pokemon.length; i++) {
        if (id === Number(pokeData.pokemon[i].id)) {
          result = pokeData.pokemon[i].evolutions;
          break;
        }
      }
    } else {
      for (let i = 0; i < pokeData.pokemon.length; i++) {
        if (name === pokeData.pokemon[i].name.toUpperCase()) {
          if (!pokeData.pokemon[i].evolutions) break;
          result = pokeData.pokemon[i].evolutions;
          break;
        }
      }
    }
    res.send(result);
  });

  app.get("/api/types", (req, res) => {
    if (!req.query.limit) {
      res.send(pokeData.types);
    } else {
      const result = [];
      for (let i = 0; i < Number(req.query.limit); i++) {
        result.push(pokeData.types[i]);
      }
      res.send(result);
    }
  });

  app.post("/api/types", (req, res) => {
    pokeData.types.push(...req.body.types);
    res.send(req.body);
  });

  app.delete("/api/types/:name", (req, res) => {
    const name = req.params.name;
    const result = pokeData.types.splice(pokeData.types.indexOf(name), 1);
    res.send(result);
  });

  app.get("/api/types/:type/pokemon", (req, res) => {
    const type = req.params.type;
    const result = pokeData.pokemon
      .filter((pokemon) => {
        return pokemon.types.includes(type);
      })
      .map((pokemon) => {
        return { id: pokemon.id, name: pokemon.name };
      });
    res.send(result);
  });

  app.get("/api/attacks", (req, res) => {
    const tmpArray = pokeData.attacks.fast.concat(pokeData.attacks.special);
    if (!req.query.limit) {
      res.send(tmpArray);
    } else {
      const result = [];
      for (let i = 0; i < Number(req.query.limit); i++) {
        result.push(tmpArray[i]);
      }
      res.send(result);
    }
  });

  app.get("/api/attacks/fast", (req, res) => {
    if (!req.query.limit) {
      res.send(pokeData.attacks.fast);
    } else {
      const result = [];
      for (let i = 0; i < Number(req.query.limit); i++) {
        result.push(pokeData.attacks.fast[i]);
      }
      res.send(result);
    }
  });

  app.get("/api/attacks/special", (req, res) => {
    if (!req.query.limit) {
      res.send(pokeData.attacks.special);
    } else {
      const result = [];
      for (let i = 0; i < Number(req.query.limit); i++) {
        result.push(pokeData.attacks.special[i]);
      }
      res.send(result);
    }
  });

  app.get("/api/attacks/:name", (req, res) => {
    const tmpArray = pokeData.attacks.fast.concat(pokeData.attacks.special);
    const name = req.params.name;
    const result = tmpArray.filter((attack) => {
      return attack.name === name;
    });
    res.send(result);
  });

  app.get("/api/attacks/:name/pokemon", (req, res) => {
    const name = req.params.name;
    const result = pokeData.pokemon
      .filter((pokemon) => {
        const attacksAll = pokemon.attacks.fast.concat(pokemon.attacks.special);
        return attacksAll.some((attack) => {
          return attack.name === name;
        });
      })
      .map((pokemon) => {
        return { id: pokemon.id, name: pokemon.name };
      });
    res.send(result);
  });

  app.post("/api/attacks/fast", (req, res) => {
    pokeData.attacks.fast.push(req.body);
    res.send(pokeData.attacks.fast);
  });

  app.post("/api/attacks/special", (req, res) => {
    pokeData.attacks.special.push(req.body);
    res.send(pokeData.attacks.special);
  });

  app.patch("/api/attacks/:name", (req, res) => {
    const newAttackName = req.params.name;
    const tmpArray = pokeData.attacks.fast.concat(pokeData.attacks.special);
    for (let i = 0; i < tmpArray.length; i++) {
      if (newAttackName === tmpArray[i].name) {
        tmpArray.splice(i, 1, req.query);
      }
    }
    res.send(pokeData.attacks.fast);
  });

  app.delete("/api/attacks/:name", (req, res) => {
    const deleteAttackName = req.params.name;
    let tmpArray = pokeData.attacks.fast.concat(pokeData.attacks.special);
    for (let i = 0; i < tmpArray.length; i++) {
      if (deleteAttackName === tmpArray[i].name) {
        tmpArray = tmpArray.slice(0, i).concat(tmpArray.slice(i + 1));
      }
    }
    res.send(tmpArray);
  });

  return app;
};

module.exports = { setupServer };

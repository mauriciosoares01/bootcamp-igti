const express = require("express");
const fs = require("fs").promises;
const port = 3000;
const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  try {
    res.send({ ok: true, message: "API read to go" });
  } catch (error) {
    res.sendStatus(400).send({ ok: false, message: error.message });
  }
});

app.get("/cities-in-state/:uf", async (req, res) => {
  try {
    let total = await citiesCount(req.params.uf);
    res.send({ totalCities: total });
  } catch (error) {
    res.sendStatus(400).send({ ok: false, message: error.message });
  }
});

app.get("/show-rank/:order", async (req, res) => {
  try {
    const score = await scoreBoard();
    let rank = [];
    if (req.params.order === "crescente") {
      rank = score.sort((a, b) => a.citiesTotal - b.citiesTotal);
    } else if (req.params.order === "decrescente") {
      rank = score.sort((a, b) => b.citiesTotal - a.citiesTotal);
    } else {
      res.sendStatus(400).send({ ok: false, message: "Missing order param" });
    }
    const topFive = rank.splice(0, 5);
    console.log(topFive);
    res.send(topFive);
  } catch (error) {
    res.sendStatus(400).send({ ok: false, message: error.message });
  }
});

app.get("/show-name-length-rank/:size", async (req, res) => {
  try {
    const list = await getNameRank(req.params.size);
    console.log(list);
    res.send(list);
  } catch (error) {
    res.sendStatus(400).send({ ok: false, message: error.message });
  }
});

app.get("/show-name-leght/:size", async (req, res) => {
  const size = req.params.size;
  try {
    let list = await getNameRank(size);
    if (size === "maior") {
      list = list.sort((a, b) => b.length - a.length);
    } else if (size === "menor") {
      list = list.sort((a, b) => a.length - b.length);
    }
    res.send(list[0]);
  } catch (error) {
    res.sendStatus(400).send({ ok: false, message: error.message });
  }
});

async function getNameRank(size) {
  try {
    const states = await getStatesList();
    let list = [];
    for (let i = 0; i < states.length; i++) {
      let cities = await fs.readFile(`states/${states[i].Sigla}.json`, "utf-8");
      cities = JSON.parse(cities);
      if (size === "menor") {
        cities = cities.sort((a, b) => a.Nome.length - b.Nome.length);
      } else if (size === "maior") {
        cities = cities.sort((a, b) => b.Nome.length - a.Nome.length);
      } else {
        return { ok: false, message: "Missing params" };
      }
      list = [...list, `${cities[0].Nome} - ${states[i].Sigla}`];
    }
    return list;
  } catch (error) {
    return error;
  }
}

async function citiesCount(uf) {
  try {
    const states = await fs.readFile(`states/${uf}.json`, "utf8");
    const json = JSON.parse(states);
    return json.length;
  } catch (err) {
    return err;
  }
}

async function getStatesList() {
  try {
    const states = await fs.readFile("estados.json", "utf-8");
    const json = JSON.parse(states);
    return json;
  } catch (err) {
    return err;
  }
}

async function scoreBoard() {
  try {
    const states = await getStatesList();
    let score = [];
    for (let i = 0; i < states.length; i++) {
      const totalCities = await citiesCount(states[i].Sigla);
      score = [...score, { state: states[i].Sigla, citiesTotal: totalCities }];
    }
    return score;
  } catch (error) {
    return error;
  }
}

// app.post("/sync", (_req, res) => {
//   try {
//     fs.readdir("states", "utf8", (err, data) => {
//       if (data.length !== 0) {
//         res.send({ ok: false, message: "Os arquivos já estão sincronizados" });
//         return;
//       }
//       fs.readFile("estados.json", (err, dataStates) => {
//         if (err) throw err;
//         const statesJSON = JSON.parse(dataStates);
//         fs.readFile("cidades.json", "utf8", (err, dataCities) => {
//           if (err) throw err;
//           const citiesJSON = JSON.parse(dataCities);
//           statesJSON.forEach((element) => {
//             const stateCities = citiesJSON.filter(
//               (item) => item.Estado === element.ID
//             );
//             fs.writeFile(
//               `states/${element.Sigla}.json`,
//               JSON.stringify(stateCities),
//               (err) => {
//                 if (err) throw err;
//               }
//             );
//           });
//           res.send({ ok: true, message: "Arquivos sincronizados com sucesso" });
//         });
//       });
//     });
//   } catch (error) {
//     res.sendStatus(400).send({ ok: false, message: error.message });
//   }
// });

app.listen(port, () => {
  console.log("API started");
});

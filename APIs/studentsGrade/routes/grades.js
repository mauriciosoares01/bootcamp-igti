const express = require("express");
const router = express.Router();
const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

global.file = "./grades.json";

router.post("/", async (req, res) => {
  try {
    let grade = req.body;
    const data = await readFile(global.file, "utf8");
    const json = JSON.parse(data);
    grade = { id: json.nextId++, ...grade, timestamp: new Date() };
    json.grades.push(grade);
    await writeFile(global.file, JSON.stringify(json));
    res.send({ ok: true, message: "Grade salva com sucesso" });
  } catch (error) {
    res.sendStatus(400).send({ ok: false, message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const grade = req.body;
    const id = req.params.id;
    let data = JSON.parse(await readFile(global.file, "utf8"));
    const index = data.grades.findIndex((item) => item.id == id);
    if (index !== -1) {
      data.grades[index] = { ...data.grades[index], ...grade };
      await writeFile(global.file, JSON.stringify(data));
      res.send({ ok: true, message: "Registro atualizado com sucesso" });
    } else {
      res
        .sendStatus(404)
        .send({ ok: false, message: "Registro não encontrado" });
    }
  } catch (error) {
    res.sendStatus(400).send({ ok: false, message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let data = JSON.parse(await readFile(global.file, "utf8"));
    const index = data.grades.findIndex((item) => item.id == id);
    if (index !== -1) {
      data.grades.splice(index, 1);
      await writeFile(global.file, JSON.stringify(data));
      res.send({ ok: true, message: "Registro removido com sucesso" });
    } else {
      res
        .sendStatus(404)
        .send({ ok: false, message: "Registro não encontrado" });
    }
  } catch (error) {
    res.sendStatus(400).send({ ok: false, message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let data = JSON.parse(await readFile(global.file, "utf8"));
    const index = data.grades.findIndex((item) => item.id == id);
    if (index !== -1) {
      res.send({ ok: true, data: data.grades[index] });
    } else {
      res
        .sendStatus(404)
        .send({ ok: false, message: "Registro não encontrado" });
    }
  } catch (error) {
    res.sendStatus(400).send({ ok: false, message: error.message });
  }
});

module.exports = router;

const express = require("express");
const port = 3000;
const app = express();
const gradesRouter = require("./routes/grades.js");
const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

app.use(express.json());
app.use("/grades", gradesRouter);

app.listen(port, () => {
  console.log("API started");
});

app.get("/student", async (req, res) => {
  try {
    const body = req.body;
    const data = JSON.parse(await readFile(global.file, "utf8"));
    const studentGrades = data.grades.filter(
      (item) => item.student === body.student && item.subject === body.subject
    );
    res.send({
      ok: true,
      data: studentGrades.reduce((acc, curr) => acc + curr.value, 0),
    });
  } catch (error) {
    res.sendStatus(400).send({ ok: false, message: error.message });
  }
});

app.get("/average", async (req, res) => {
  try {
    const body = req.body;
    const data = JSON.parse(await readFile(global.file, "utf8"));
    const average = await getAverage(body, data);
    res.send({ ok: true, data: average });
  } catch (error) {
    res.sendStatus(400).send({ ok: false, message: error.message });
  }
});

app.get("/rank", async (req, res) => {
  try {
    const body = req.body;
    const data = JSON.parse(await readFile(global.file, "utf8"));
    const average = await getAverage(body, data);
    res.send({ ok: true, data: average });
  } catch (error) {
    res.sendStatus(400).send({ ok: false, message: error.message });
  }
});

async function getAverage(body, data) {
  try {
    const grades = data.grades.filter(
      (item) => item.subject === body.subject && item.type === body.type
    );
    return grades.reduce((acc, curr) => acc + curr.value, 0) / grades.length;
  } catch (error) {
    res.sendStatus(400).send({ ok: false, message: error.message });
  }
}

app.get("/", (_req, res) => {
  try {
    res.send({ ok: true, message: "Read to go!" });
  } catch (error) {
    res.sendStatus(400).send({ ok: false, message: error.message });
  }
});

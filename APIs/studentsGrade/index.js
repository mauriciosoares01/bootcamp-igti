const express = require("express");
const router = express.Router();
const port = 3000;
const app = express();
const gradesRouter = require("./routes/grades.js");

app.use(express.json());
app.use("/grades", gradesRouter);

app.listen(port, () => {
  console.log("API started");
});

app.get("/", (_req, res) => {
  try {
    res.send({ ok: true, message: "Read to go!" });
  } catch (error) {
    res.sendStatus(400).send({ ok: false, message: error.message });
  }
});

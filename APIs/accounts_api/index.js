import express from "express";
import { accountRouter } from "./src/routes/accountRouter.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(accountRouter);

(async () => {
  try {
    mongoose.connect(
      "mongodb+srv://teste:teste123@cluster0.dkw38.mongodb.net/grades?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
})();

app.get("/", async (req, res) => {
  try {
    res.send({
      ok: true,
      message: "Read to go!",
    });
  } catch (error) {
    res.send({
      ok: false,
      message: "Erro",
      error,
    });
  }
});

app.listen(3000, () => console.log("API is ready to go"));

import express from "express";
import {
  getAccounts,
  createDeposit,
  createWithdraw,
  getBalance,
  deleteAccount,
  createTransfer,
  getBalanceAsc,
  getBalanceDec,
  createPrivateAccounts,
  getAverageBalance,
} from "../controllers/accountsController.js";

const app = express();

app.get("/accounts", async (req, res) => {
  await getAccounts(req, res);
});

app.post("/deposit", async (req, res) => {
  await createDeposit(req, res);
});

app.post("/withdraw", async (req, res) => {
  await createWithdraw(req, res);
});

app.post("/balance", async (req, res) => {
  await getBalance(req, res);
});

app.delete("/delete", async (req, res) => {
  await deleteAccount(req, res);
});

app.post("/transfer", async (req, res) => {
  await createTransfer(req, res);
});

app.get("/balance-asc/:limit", async (req, res) => {
  await getBalanceAsc(req, res);
});

app.get("/balance-dec/:limit", async (req, res) => {
  await getBalanceDec(req, res);
});

app.get("/create-private", async (req, res) => {
  await createPrivateAccounts(req, res);
});

app.get("/average/:agency", async (req, res) => {
  await getAverageBalance(req, res);
});

export { app as accountRouter };

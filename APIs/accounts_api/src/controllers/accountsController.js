import { accountModel } from "../models/accountModel.js";

const getAccounts = async (req, res) => {
  try {
    const accounts = await accountModel.find({});
    res.send(accounts);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createDeposit = async (req, res) => {
  try {
    const body = req.body;
    if (body.value <= 0) {
      res.status(400).send({
        ok: false,
        message: "O valor de depósito deve ser maior que 0(zero)",
      });
    }
    const response = await accountModel.findOneAndUpdate(
      { agencia: body.agencia, conta: body.conta },
      { $inc: { balance: body.value } }
    );
    res.send({
      ok: true,
      message: `Depósito realizado com sucesso. Saldo atual de R$${
        response.balance + body.value
      }`,
    });
  } catch (error) {
    res.status(500).send({ ok: false, message: "Erro ao depositar", error });
  }
};

const createWithdraw = async (req, res) => {
  try {
    const body = req.body;
    if (body.value <= 0) {
      res.status(400).send({
        ok: false,
        message: "O valor de saque deve ser maior que 0(zero)",
      });
    }
    const response = await accountModel.findOneAndUpdate(
      { agencia: body.agencia, conta: body.conta },
      { $inc: { balance: -body.value } }
    );
    res.send({
      ok: true,
      message: `Saque realizado com sucesso. Saldo atual de R$${
        response.balance - body.value
      }`,
    });
  } catch (error) {
    res.status(500).send({ ok: false, message: "Erro ao sacar", error });
  }
};

const getBalance = async (req, res) => {
  try {
    const body = req.body;
    const response = await accountModel.findOne({
      agencia: body.agencia,
      conta: body.conta,
    });
    res.send({
      ok: true,
      message: `Saldo atual de R$${response.balance}`,
      data: response.balance,
    });
  } catch (error) {
    res.status(500).send({ ok: false, message: "Erro ao sacar", error });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const body = req.body;
    await accountModel.findOneAndDelete({
      agencia: body.agencia,
      conta: body.conta,
    });
    const count = await accountModel.countDocuments();
    res.send({
      ok: true,
      message: `Conta apagada com sucesso. Número de contas da agência: count`,
      data: count,
    });
  } catch (error) {
    res.status(500).send({ ok: false, message: "Erro ao apagar conta", error });
  }
};

const createTransfer = async (req, res) => {
  try {
    const body = req.body;

    if (body.value <= 0) {
      res.status(400).send({
        ok: false,
        message: "O valor da tranferência deve ser maior que 0(zero)",
      });
    }

    const { contaOrigem, contaDestino, value } = body;
    let transferValue = value;
    if (contaOrigem.agencia !== contaDestino.agencia) {
      transferValue += 8;
    }

    const responseWithdraw = await accountModel.findOneAndUpdate(
      { agencia: contaOrigem.agencia, conta: contaOrigem.conta },
      { $inc: { balance: -transferValue } }
    );

    const responseDeposit = await accountModel.findOneAndUpdate(
      { agencia: contaDestino.agencia, conta: contaDestino.conta },
      { $inc: { balance: value } }
    );

    res.send({
      ok: true,
      message: `Tranferência realizada com sucesso. Saldo da conta de origem: R$${
        responseWithdraw.balance - transferValue
      }`,
      data: responseWithdraw.balance - transferValue,
    });
  } catch (error) {
    res
      .status(500)
      .send({ ok: false, message: "Erro ao realizar a transferência", error });
  }
};

const getBalanceAsc = async (req, res) => {
  try {
    const { limit } = req.params;
    const result = await accountModel
      .find({})
      .sort({ balance: 1 })
      .limit(Number(limit));
    res.send({
      ok: true,
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .send({ ok: false, message: "Erro ao realizar a consulta", error });
  }
};

const getBalanceDec = async (req, res) => {
  try {
    const { limit } = req.params;
    const result = await accountModel
      .find({})
      .sort({ balance: -1 })
      .limit(Number(limit));
    res.send({
      ok: true,
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .send({ ok: false, message: "Erro ao realizar a consulta", error });
  }
};

const createPrivateAccounts = async (req, res) => {
  try {
    const result = await accountModel.distinct("agencia");

    let response;
    for (let i = 0; i < result.length; i++) {
      response = await accountModel
        .find({})
        .sort({ balance: -1 })
        .limit(1)
        .updateOne({ agencia: result[i] }, { agencia: 99 });
    }

    res.send({
      ok: true,
      message: response,
    });
  } catch (error) {
    res
      .status(500)
      .send({ ok: false, message: "Erro ao realizar a consulta", error });
  }
};

const getAverageBalance = async (req, res) => {
  try {
    const { agency } = req.params;
    const result = await accountModel.aggregate({
      $group: {
        agencia: agency,
        average: { $avg: "balance" },
      },
    });
    res.send({
      ok: true,
      message: result,
    });
  } catch (error) {
    res
      .status(500)
      .send({ ok: false, message: "Erro ao realizar a consulta", error });
  }
};

export {
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
};

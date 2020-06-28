import React, { useState, useEffect } from "react";
import Form from "../../components/Form";
import Installments from "../../components/Installments";
import { Container } from "@material-ui/core";

export default function Home() {
  const [months, setMonths] = useState([]);
  const [amount, setAmount] = useState(1000);
  const [interest, setInterest] = useState(0.5);
  const [period, setPeriod] = useState(1);

  useEffect(() => {
    let monthList = [];

    for (let i = 1; i <= period; i++) {
      const newAmount = amount * Math.pow(1 + interest / 100, i);
      const profit = newAmount - amount;
      const profitPercent = (profit / amount) * 100;

      monthList.push({
        month: i,
        newAmount: newAmount.toFixed(2),
        profit: profit.toFixed(2),
        profitPercent: profitPercent.toFixed(2),
      });
    }
    setMonths(monthList);
  }, [amount, interest, period]);

  return (
    <Container>
      <h1>React - Juros Compostos</h1>
      <Form
        amount={amount}
        setAmount={setAmount}
        interest={interest}
        setInterest={setInterest}
        period={period}
        setPeriod={setPeriod}
      />
      <Installments list={months} />
    </Container>
  );
}

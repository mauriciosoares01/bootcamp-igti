import React from "react";
import { TextField, Box } from "@material-ui/core";

export default function Form({
  setAmount,
  setInterest,
  setPeriod,
  amount,
  interest,
  period,
}) {
  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleInterest = (event) => {
    setInterest(event.target.value);
  };

  const handlePeriod = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <Box>
      <TextField
        label="Montante inicial"
        style={styles.textField}
        type="number"
        value={amount}
        onChange={handleAmount}
        inputProps={{ step: 100 }}
      />
      <TextField
        label="Taxa de juros mensal(%)"
        style={styles.textField}
        type="number"
        value={interest}
        onChange={handleInterest}
        inputProps={{ step: 0.1 }}
      />
      <TextField
        label="Período (meses)"
        style={styles.textField}
        type="number"
        value={period}
        onChange={handlePeriod}
      />
    </Box>
  );
}

const styles = {
  textField: {
    margin: "10px",
  },
};

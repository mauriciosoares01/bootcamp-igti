import React from "react";
import { Box } from "@material-ui/core";

export default function Installment({
  month,
  newAmount,
  profit,
  profitPercent,
}) {
  return (
    <Box style={styles.box}>
      <Box style={styles.boxId}>
        <label>{month}</label>
      </Box>
      <Box style={styles.boxDescription}>
        <label>R$ {newAmount}</label>
        <label>R$ {profit}</label>
        <label>{profitPercent}%</label>
      </Box>
    </Box>
  );
}

const styles = {
  box: {
    padding: "10px",
    border: "1px solid lightGray",
    margin: "5px",
    display: "flex",
    flexDirection: "row",
    width: "150px",
  },
  boxId: {
    alignItems: "center",
    justifyContent: "center",
    margin: "5px",
    display: "flex",
  },
  boxDescription: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "5px",
  },
};

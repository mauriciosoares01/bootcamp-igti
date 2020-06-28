import React from "react";
import Installment from "../components/Installment";
import { Grid } from "@material-ui/core";

export default function Installments({ list }) {
  return (
    <Grid container>
      {list.map(({ month, newAmount, profit, profitPercent }) => (
        <Installment
          key={month}
          month={month}
          newAmount={newAmount}
          profit={profit}
          profitPercent={profitPercent}
        />
      ))}
    </Grid>
  );
}

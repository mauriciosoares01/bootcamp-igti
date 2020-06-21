import React, { Component } from "react";
import { Container } from "./styles";
import { Box } from "@material-ui/core";

export default class index extends Component {
  render() {
    const { IRPF, INSS, salarioLiquido } = this.props;
    return (
      <Container>
        <div
          id="#irpf"
          style={{ width: `${INSS}%`, backgroundColor: "#ffa500", height: 15 }}
        />
        <div
          id="#inss"
          style={{ width: `${IRPF}%`, backgroundColor: "#ff3333", height: 15 }}
        />
        <div
          id="#salarioliq"
          style={{
            width: `${salarioLiquido}%`,
            backgroundColor: "#03bb85",
            height: 15,
          }}
        />
      </Container>
    );
  }
}

import React, { Component } from "react";
import Graph from "../../components/Graph";
import { Container, Box, TextField, InputAdornment } from "@material-ui/core";
import { calculateSalaryFrom } from "../../utils/salary";

export default class index extends Component {
  constructor() {
    super();

    this.state = {
      salarioBruto: 0,
      descontoINSS: 0,
      baseINSS: 0,
      baseIRPF: 0,
      descontoIRPF: 0,
      salarioLiquido: 0,
      descontoINSSPercent: 0,
      salarioLiquidoPercent: 0,
    };
  }

  componentDidMount() {
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(1000);

    this.setState({
      salarioBruto: 1000,
      descontoINSS: discountINSS,
      baseINSS,
      baseIRPF,
      descontoIRPF: discountIRPF,
      salarioLiquido: netSalary,
      descontoINSSPercent: (discountINSS * 100) / 1000,
      descontoIRPFPercent: (discountIRPF * 100) / 1000,
      salarioLiquidoPercent: (netSalary * 100) / 1000,
    });
  }

  handleSalarioBruto = (event) => {
    const value = event.target.value;
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(value);

    this.setState({
      salarioBruto: value,
      descontoINSS: discountINSS,
      baseINSS,
      baseIRPF,
      descontoIRPF: discountIRPF,
      salarioLiquido: netSalary,
      descontoINSSPercent: (discountINSS * 100) / value,
      descontoIRPFPercent: (discountIRPF * 100) / value,
      salarioLiquidoPercent: (netSalary * 100) / value,
    });
  };

  render() {
    const {
      salarioBruto,
      baseINSS,
      baseIRPF,
      descontoINSS,
      descontoIRPF,
      salarioLiquido,
      descontoINSSPercent,
      descontoIRPFPercent,
      salarioLiquidoPercent,
    } = this.state;
    return (
      <Container>
        <h1>React Salary</h1>
        <TextField
          label="Salário bruto"
          value={salarioBruto}
          onChange={this.handleSalarioBruto}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
        />
        <Box>
          <TextField
            label="Base INSS"
            value={baseINSS}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Desconto INSS"
            value={`${descontoINSS} (${descontoINSSPercent.toFixed(2)}%)`}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Base IRPF"
            value={baseIRPF}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Desconto IRPF"
            value={`${descontoIRPF} (${descontoIRPFPercent}%)`}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
        </Box>
        <Box>
          <TextField
            label="Salário líquido"
            value={`${salarioLiquido} (${salarioLiquidoPercent.toFixed(2)}%)`}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
        </Box>
        <Graph
          IRPF={descontoIRPFPercent}
          INSS={descontoINSSPercent}
          salarioLiquido={salarioLiquidoPercent}
        />
      </Container>
    );
  }
}

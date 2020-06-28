import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import * as api from "../../services/api";

export default function Home() {
  const [grades, setGrades] = useState();

  useEffect(() => {
    getGrades();
  }, []);

  async function getGrades() {
    const res = await api.getAllGrades();
    console.log(res);
  }

  return <Container>Olá mundo!</Container>;
}

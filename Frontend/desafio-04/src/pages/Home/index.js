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

    if (res.status === 200) {
      const fomatedGrades = res.data.grades.map((grade) => {
        const { student, subject, type } = grade;
        return {
          ...grade,
          studentLowerCase: student.toLowerCase(),
          subjectLowerCase: subject.toLowerCase(),
          typeLowerCase: type.toLowerCase(),
          isDeleted: false,
        };
      });

      setGrades(fomatedGrades);
    }
  }

  return <Container>Olá mundo</Container>;
}

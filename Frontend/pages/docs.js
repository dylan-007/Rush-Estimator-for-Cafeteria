import React from "react";
import { Container } from "react-bootstrap";
import Note from "../components/docs/Note";
import Steps from "../components/docs/Steps";

function docs() {
  return (
    <>
      <Container>
        <h2>Steps to Follow</h2>
        <Steps />
        <Note />
      </Container>
    </>
  );
}

export default docs;

import React from "react";
import { Container } from "react-bootstrap";
import Register from "./components/SigningPage/Register";

const App = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center app-style">
      <Register />
    </Container>
  );
}

export default App;

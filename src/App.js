import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/SigningPage/Register";
import AdminPage from "./components/Home/AdminPage";

const App = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center app-style">
      <Router>
        <Routes>
          <Route path="/" element={<AdminPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;

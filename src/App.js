import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/SigningPage/Register";
import AdminPage from "./components/Home/AdminPage";
import Login from "./components/SigningPage/Login";
import { AuthContext } from "./AuthContext";

const App = () => {
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    status: false
  });
  console.log("dupa");

  return (
    <Container className="d-flex align-items-center justify-content-center app-style">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Routes>
            <Route exact path="/" element={<AdminPage />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </Container>
  );
}

export default App;

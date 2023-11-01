import './App.css';
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register/Register";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";

function App() {
  return (
      <>
        <Header />
        {/*<ToastContainer style={{ width: "400px" }} />*/}
        <Container className="mt-3">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </>
  );
}

export default App;

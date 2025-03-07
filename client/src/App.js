import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar/navbar";
import { Home } from "./components/home/home";
import { Login } from "./components/login/login"
import { CreateBook } from "./components/create-book/create-book"
 
function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Create/Book" element={<CreateBook />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

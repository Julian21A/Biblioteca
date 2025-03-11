import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar/navbar";
import { Home } from "./components/home/home";
import { Login } from "./components/login/login"
import CreateBook  from "./components/book/create-book/create-book"
import CreateAuthor from "./components/author/create-author/create-author";
import SearchBook from "./components/book/search-book/search-book";
import SearchAuthor from "./components/author/search-author/search-author"
 
function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="Book/Add" element={<CreateBook />}/>
        <Route exact path="Book/Search" element={<SearchBook />}/>
        <Route exact path="Author/Add" element={<CreateAuthor />}/>
        <Route exact path="Author/Search" element={<SearchAuthor />}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;

import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar/navbar";
import { Home } from "./components/home/home";
import { Login } from "./components/login/login";
import CreateBook from "./components/book/create-book/create-book";
import CreateAuthor from "./components/author/create-author/create-author";
import SearchBook from "./components/book/search-book/search-book";
import SearchAuthor from "./components/author/search-author/search-author";
import NotFound from "./components/shared/not-found/not-found";
import AuthorDetail from "./components/author/detail-author/detail-author";
import BookDetail from "./components/book/detail-book/detail-book";
import UserRegister from "./components/user/register-user/register-user";
import SearchUser from "./components/user/search-user/search-user";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="Book/Add" element={<CreateBook />} />
        <Route exact path="Book/Search" element={<SearchBook />} />
        <Route path="/Book/Detail/:id" element={<BookDetail />} />
        <Route exact path="Author/Add" element={<CreateAuthor />} />
        <Route exact path="Author/Edit" element={<CreateAuthor />} />
        <Route exact path="Author/Search" element={<SearchAuthor />} />
        <Route path="/Author/Detail/:id" element={<AuthorDetail />} />
        <Route path="/User/Add" element={<UserRegister />} />
        <Route path="/User/Search" element={<SearchUser />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

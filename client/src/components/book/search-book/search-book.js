import "./search-book.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getBookInfo, resetBooks } from "../../../redux/reducer/bookSlice";

const SearchBook = () => {
  const [name, setName] = useState("");
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();
  const { bookData, loading, error } = useSelector((state) => state.book || {});

//   bookData = [
//     {
//       title: "libro1",
//       pages: 200,
//       isbn: "holii",
//       publisher: "pajarito",
//       id: "1",
//       author: "paquito",
//       count: "2",
//     },
//     {
//       title: "libro2",
//       pages: 200,
//       isbn: "holii",
//       publisher: "pajarito",
//       id: "2",
//       author: "me",
//       count: "1",
//     },
//   ];

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getBookInfo(name));
    setSearched(true);
  };

  const handleClearSearch = () => {
    setName("");
    setSearched(false);
    dispatch(resetBooks());
  };

  return (
    <div>
      <div className="card-search">
        <h1 className="title-page">Buscar Libro</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <button className="bton-search" type="submit">
              Buscar
            </button>
            {searched && (
              <button className="bton-search" onClick={handleClearSearch}>
                Reiniciar
              </button>
            )}
          </div>
        </form>
      </div>
      {loading && <p>Cargando...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {bookData?.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Páginas</th>
              <th>ISBN</th>
              <th>Editorial</th>
              <th>Author</th>
              <th>Disponibles</th>
            </tr>
          </thead>
          <tbody>
            {bookData.map((book) => (
              <tr key={book.id}>
                <td>
                  <NavLink
                    className="table-index"
                    to={`/Book/Detail/${book.title}`}
                  >
                    {book.title}
                  </NavLink>
                </td>
                <td>{book.pages}</td>
                <td>{book.isbn}</td>
                <td>{book.publisher}</td>
                <td>
                  <NavLink
                    className="table-index"
                    to={`/Author/Detail/${book.author}`}
                  >
                    {book.author}
                  </NavLink>
                </td>
                <td>{book.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchBook;

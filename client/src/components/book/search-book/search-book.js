import "./search-book.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getBookInfo,
  resetBooks,
  getBookDetail,
} from "../../../redux/reducer/bookSlice";
import Loader from "../../shared/loader/loader";
import { getAuthorDetail } from "../../../redux/reducer/authorSlice";
import Notification from "../../shared/notification/notification";

const SearchBook = () => {
  const [name, setName] = useState("");
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();
  const { bookData, loading, error } = useSelector(
    (state) => state.books || {}
  );
  const [notification, setNotification] = useState(null);

  const handleBookDetail = (bookId) => {
    dispatch(getBookDetail(bookId));
  };

  const handleAuthorDetail = (authorId) => {
    dispatch(getAuthorDetail(authorId));
  };

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
  const handleCloseNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (error) {
      setNotification({
        message: error ? error : "Error Desconocido",
        type: "error",
      });
    }
    return () => {
      setNotification(null);
    };
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(resetBooks());
    };
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      {loading && <Loader />}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
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
      {bookData?.length > 0 && (
        <div className="search-table-container">
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
                      to={`/Book/Detail`}
                      onClick={() => handleBookDetail(book.id)}
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
                      to={`/Author/Detail`}
                      onClick={() => handleAuthorDetail(book.authorId)}
                    >
                      {book.author}
                    </NavLink>
                  </td>
                  <td>{book.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchBook;

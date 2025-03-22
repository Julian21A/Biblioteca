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

/**
 * Componente para buscar libros.
 * Permite a los usuarios buscar libros por nombre y ver detalles de autores o libros específicos.
 *
 * @component
 * @returns {JSX.Element} Componente de búsqueda de libros.
 */
const SearchBook = () => {
  const [name, setName] = useState("");
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();
  const { bookData, loading, error } = useSelector(
    (state) => state.books || {}
  );
  const [notification, setNotification] = useState(null);

  /**
   * Efecto para cargar la búsqueda previa almacenada en localStorage y ejecutar la busqueda automatica al cargar el componente
   */
  useEffect(() => {
    const bookNameExt = localStorage.getItem("bookSearch");
    if (bookNameExt) {
      dispatch(getBookInfo(bookNameExt));
      setSearched(true);
      localStorage.removeItem("bookSearch");
    }
  }, [dispatch]);

  /**
   * Maneja la navegación al detalle de un libro.
   * @param {number} bookId - ID del libro.
   */
  const handleBookDetail = (bookId) => {
    dispatch(getBookDetail(bookId));
  };

  /**
   * Maneja la navegación al detalle de un autor.
   * @param {number} authorId - ID del autor.
   */
  const handleAuthorDetail = (authorId) => {
    dispatch(getAuthorDetail(authorId));
  };

  /**
   * Maneja la búsqueda de un libro por nombre.
   * @param {Event} e - Evento del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getBookInfo(name));
    setSearched(true);
  };

  /**
   * Reinicia la búsqueda y limpia los resultados.
   */
  const handleClearSearch = () => {
    setName("");
    setSearched(false);
    dispatch(resetBooks());
  };

  /**
   * Cierra la notificación activa.
   */
  const handleCloseNotification = () => {
    setNotification(null);
  };

  /**
   * Efecto para manejar las notificaciones de error.
   */
  useEffect(() => {
    if (error) {
      setNotification({
        message: error ? error.message : "Error Desconocido",
        type: "error",
      });
    }
    return () => {
      setNotification(null);
    };
  }, [error]);

  /**
   * Efecto de limpieza al desmontar el componente.
   */
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
                <th>Estado</th>
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
                    {book.authors.map((author) => (
                      <NavLink
                        key={author.id}
                        className="table-index"
                        to={`/Author/Detail`}
                        onClick={() => handleAuthorDetail(author.id)}
                      >
                        {author.firstName} {author.lastName} <br />
                      </NavLink>
                    ))}
                  </td>
                  {book.isAvailable === true ? (
                    <td>Disponible</td>
                  ) : (
                    <td>Prestado</td>
                  )}
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

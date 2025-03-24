import "./search-author.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getAuthorInfo,
  resetAuthors,
  getAuthorDetail,
} from "../../../redux/reducer/authorSlice";
import Loader from "../../shared/loader/loader";
import Notification from "../../shared/notification/notification";

/**
 * Componente para la búsqueda de autores.
 * @component
 * @returns {JSX.Element} Un formulario para buscar autores y mostrar los resultados.
 */
const SearchAuthor = () => {
  /**
   * Estado local para el nombre del autor a buscar.
   * @type {[string, function]}
   */
  const [firstName, setFirstName] = useState("");

  /**
   * Indica si se ha realizado una búsqueda.
   * @type {[boolean, function]}
   */
  const [searched, setSearched] = useState(false);

  const dispatch = useDispatch();

  /**
   * Obtiene los datos del autor desde el estado global.
   * @type {Object}
   */
  const { authorData, loading, error } = useSelector(
    (state) => state.authors || {}
  );

  /**
   * Estado para mostrar notificaciones de error.
   * @type {[object|null, function]}
   */
  const [notification, setNotification] = useState(null);

  /**
   * Maneja la visualización de los detalles de un autor.
   * @param {number} authorId - ID del autor.
   */
  const handleAuthorDetail = (authorId) => {
    dispatch(getAuthorDetail(authorId));
  };

  /**
   * Maneja el envío del formulario de búsqueda.
   * @param {Event} e - Evento del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAuthorInfo(firstName));
    setSearched(true);
  };

  /**
   * Reinicia la búsqueda y limpia los resultados.
   */
  const handleClearSearch = () => {
    setFirstName("");
    setSearched(false);
    dispatch(resetAuthors());
  };

  /**
   * Cierra la notificación actual.
   */
  const handleCloseNotification = () => {
    setNotification(null);
  };

  /**
   * Muestra una notificación en caso de error.
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
   * Resetea los datos de autores al desmontar el componente.
   */
  useEffect(() => {
    return () => {
      dispatch(resetAuthors());
    };
  }, [dispatch]);

  return (
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
        <h1 className="title-page">Buscar Autor</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="name-input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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

      {authorData.length > 0 && (
        <div className="search-table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th># Libros</th>
              </tr>
            </thead>
            <tbody>
              {authorData.map((author) => (
                <tr key={author.id}>
                  <td>
                    <NavLink
                      className="table-index"
                      to={`/Author/Detail`}
                      onClick={() => handleAuthorDetail(author.id)}
                    >
                      {author.firstName} {author.lastName}
                    </NavLink>
                  </td>
                  <td>{author.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchAuthor;

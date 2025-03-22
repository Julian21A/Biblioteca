import "./detail-author.css";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import NotFound from "../../shared/not-found/not-found";
import Loader from "../../shared/loader/loader";

/**
 * Componente para mostrar los detalles de un autor.
 * @component
 * @returns {JSX.Element} El componente de detalle del autor.
 */
const AuthorDetail = () => {
  const navigate = useNavigate();

  /**
   * Obtiene los detalles del autor, el estado de carga y los errores desde Redux.
   * @type {{ authorDetail: object, loading: boolean, error: any }}
   */
  const { authorDetail, loading, error } = useSelector(
    (state) => state.authors || {}
  );

  /**
   * Obtiene los datos del usuario autenticado desde Redux.
   * @type {{ user: { role: string } }}
   */
  const { user } = useSelector((state) => state.auth || {});

  /**
   * Determina si el usuario tiene permisos de administrador o bibliotecario.
   * @type {boolean}
   */
  const validateRoleLib = user?.role === "ADMIN" || user?.role === "LIBRARIAN";

  /**
   * Maneja la selección de un libro y almacena el nombre en el localStorage.
   * @param {string} bookName - Nombre del libro seleccionado.
   */
  const handleBookDetail = (bookName) => {
    localStorage.setItem("bookSearch", bookName);
  };

  /**
   * Maneja la acción de edición del autor y navega a la página de edición.
   */
  const handleEditClick = () => {
    sessionStorage.setItem("navigatedFromEdit", "true");
    navigate("/Author/Edit");
  };
  if (error || !authorDetail) {
    return <NotFound message="author" />;
  }

  return (
    <div className="author-detail-container">
      {loading && <Loader />}
      <h1 className="author-name">
        {authorDetail.json?.firstName} {authorDetail.json?.lastName}
      </h1>

      <div className="author-detail-content">
        <div className="author-left">
          <img
            src={authorDetail.image}
            alt={authorDetail.json?.firstName}
            className="author-photo"
          />
          <div className="author-bio">
            <p>{authorDetail.json?.biography}</p>
          </div>
        </div>
        <div className="author-right">
          {validateRoleLib && (
            <div className="add-author-button-container">
              <button
                className="add-author-button"
                type="button"
                onClick={handleEditClick}
              >
                Editar
              </button>
            </div>
          )}
          <div className="search-book-table-container">
            <table className="author-books-table">
              <tbody>
                {authorDetail.json?.books?.map((book) => (
                  <tr key={book.bookName}>
                    <td>
                      <NavLink
                        to={`/Book/Search`}
                        className="book-titles"
                        onClick={() => handleBookDetail(book.bookName)}
                      >
                        {book.bookName}
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetail;

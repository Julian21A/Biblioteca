import "./detail-author.css";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import NotFound from "../../shared/not-found/not-found";
import Loader from "../../shared/loader/loader";

const AuthorDetail = () => {
  const navigate = useNavigate();
  const { authorDetail, loading, error } = useSelector(
    (state) => state.authors || {}
  );
  const { user } = useSelector((state) => state.auth || {});
  const validateRoleLib = user?.role === "ADMIN" || user?.role === "LIBRARIAN";

  const handleBookDetail = (bookName) => {
    localStorage.setItem("bookSearch", bookName);
  };

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

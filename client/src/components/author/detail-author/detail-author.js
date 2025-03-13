import "./detail-author.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { resetAuthorDetail } from "../../../redux/reducer/authorSlice";
import NotFound from "../../shared/not-found/not-found";
import Loader from "../../shared/loader/loader";
import { getBookDetail } from "../../../redux/reducer/bookSlice";

const AuthorDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authorDetail, loading, error } = useSelector(
    (state) => state.authors || {}
  );

  const [navigatedFromEdit, setNavigatedFromEdit] = useState(
    sessionStorage.getItem("navigatedFromEdit") === "true" ? true : false
  );

  const handleBookDetail = (bookId) => {
    dispatch(getBookDetail(bookId));
  };

  const handleEditClick = () => {
    setNavigatedFromEdit(true);
    sessionStorage.setItem("navigatedFromEdit", "true");
    navigate("/Author/Edit");
  };

  useEffect(() => {
    return () => {
      if (!navigatedFromEdit) {
        dispatch(resetAuthorDetail());
      }
      sessionStorage.removeItem("navigatedFromEdit");
    };
  }, [dispatch, navigatedFromEdit]);

  if (error || !authorDetail) {
    return <NotFound message="author" />;
  }

  return (
    <div className="author-detail-container">
      {loading && <Loader />}
      <h1 className="author-name">
        {authorDetail.name} {authorDetail.lastName}
      </h1>

      <div className="author-detail-content">
        <div className="author-left">
          <img
            src={authorDetail.image}
            alt={authorDetail.name}
            className="author-photo"
          />
          <div className="author-bio">
            {authorDetail.biography.map((bio, index) => (
              <p key={index}>{bio}</p>
            ))}
          </div>
        </div>
        <div className="author-right">
          <div className="add-author-button-container">
            <button
              className="add-author-button"
              type="button"
              onClick={handleEditClick}
            >
              Editar
            </button>
          </div>
          <div className="search-book-table-container">
            <table className="author-books-table">
              <tbody>
                {authorDetail.books.map((book) => (
                  <tr key={book.id}>
                    <td>
                      <NavLink
                        to={`/Book/Detail`}
                        className="book-titles"
                        onClick={() => handleBookDetail(book.id)}
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

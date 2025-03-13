import "./detail-book.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import NotFound from "../../shared/not-found/not-found";
import Loader from "../../shared/loader/loader";
import { getAuthorDetail } from "../../../redux/reducer/authorSlice";
import { resetBookDetail } from "../../../redux/reducer/bookSlice";

const BookDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookDetail, loading, error } = useSelector(
    (state) => state.books || {}
  );

  const [navigatedFromEditB, setNavigatedFromEditB] = useState(
    sessionStorage.getItem("navigatedFromEditB") === "true" ? true : false
  );

  const handleAuthorDetail = (authorId) => {
    dispatch(getAuthorDetail(authorId));
  };

  const handleEditClick = () => {
    setNavigatedFromEditB(true);
    sessionStorage.setItem("navigatedFromEditB", "true");
    navigate("/Book/Edit");
  };

  useEffect(() => {
    return () => {
      if (!navigatedFromEditB) {
        dispatch(resetBookDetail());
      }
      sessionStorage.removeItem("navigatedFromEditB");
    };
  }, [dispatch, navigatedFromEditB]);

  if (error || !bookDetail) {
    return <NotFound message="author" />;
  }

  return (
    <div className="book-detail-container">
      {loading && <Loader />}
      <h1 className="book-title">{bookDetail.title}</h1>

      <div className="book-detail-content">
        <div className="book-left">
          <img
            src={bookDetail.image}
            alt={bookDetail.title}
            className="book-image"
          />
        </div>

        <div className="book-right">
          <div className="add-book-button-container">
            <div className="book-right-up ">
              <p>
                <strong>Páginas:</strong> {bookDetail.pages}
              </p>
              <p>
                <strong>ISBN:</strong> {bookDetail.isbn}
              </p>
              <p>
                <strong>Editorial:</strong> {bookDetail.publisher}
              </p>
              <p>
                <strong>Disponibles:</strong> {bookDetail.count}
              </p>

              <NavLink
                to={`/Author/Detail`}
                className="author-link"
                onClick={() => handleAuthorDetail(bookDetail.authorId)}
              >
                <strong>Autor: </strong>
                {bookDetail.author}
              </NavLink>
            </div>
            <button
              className="add-book-button"
              type="button"
              onClick={handleEditClick}
            >
              Editar
            </button>
          </div>
          <div className="book-summary">
            <h3>
              {" "}
              <strong>Sinopsis:</strong>
            </h3>
            {bookDetail.resume.map((res, index) => (
              <p key={index}>{res}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;

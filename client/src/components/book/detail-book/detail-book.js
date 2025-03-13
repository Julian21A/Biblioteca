import "./detail-book.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { resetBookDetail } from "../../../redux/reducer/bookSlice";
import NotFound from "../../shared/not-found/not-found";
import Loader from "../../shared/loader/loader";
import { getAuthorDetail } from "../../../redux/reducer/authorSlice";

const BookDetail = () => {
  const dispatch = useDispatch();
  const { bookDetail, loading, error } = useSelector(
    (state) => state.authors || {}
  );

  const handleAuthorDetail = (authorId) => {
    dispatch(getAuthorDetail(authorId));
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !bookDetail) {
    return <NotFound message="author" />;
  }

  return (
    <div className="book-detail-container">
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
              to={`/Author/Detail/${bookDetail.authorId}`}
              className="author-link"
              onClick={() => handleAuthorDetail(bookDetail.authorId)}
            >
              <strong>Autor: </strong>
              {bookDetail.author}
            </NavLink>
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

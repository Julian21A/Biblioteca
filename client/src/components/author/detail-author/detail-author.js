import "./detail-author.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { resetAuthorDetail } from "../../../redux/reducer/authorSlice";
import NotFound from "../../shared/not-found/not-found";
import Loader from "../../shared/loader/loader";
import { getBookDetail } from "../../../redux/reducer/bookSlice";

const AuthorDetail = () => {
  const dispatch = useDispatch();
  const { authorDetail, loading, error } = useSelector(
    (state) => state.authors || {}
  );

  const handleBookDetail = (bookId) => {
    dispatch(getBookDetail(bookId));
  };

  useEffect(() => {
    return () => {
      dispatch(resetAuthorDetail());
    };
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error || !authorDetail) {
    return <NotFound message="author" />;
  }

  return (
    <div className="author-detail-container">
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
          <div className="search-table-container">
            <table className="author-books-table">
              <tbody>
                {authorDetail.books.map((book) => (
                  <tr key={book.id}>
                    <td>
                      <NavLink
                        to={`/Book/Detail/${book.id}`}
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

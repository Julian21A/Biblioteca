import "./detail-book.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import NotFound from "../../shared/not-found/not-found";
import Loader from "../../shared/loader/loader";
import { getAuthorDetail } from "../../../redux/reducer/authorSlice";
import {
  deleteBook,
  getBookDetail,
  rentBook,
  resetStatusDelete,
  resetStatusRent,
} from "../../../redux/reducer/bookSlice";
import Notification from "../../shared/notification/notification";

const BookDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const {
    bookDetail,
    success,
    loading,
    error,
    errorRent,
    successDelete,
    errorDelete,
  } = useSelector((state) => state.books || {});
  const { user } = useSelector((state) => state.auth || {});
  const [notification, setNotification] = useState(null);
  const validateRoleLib = user?.role === "ADMIN" || user?.role === "LIBRARIAN";
  const validateRoleUser = user?.role === "USER";

  const handlePrestarClick = () => {
    setShowModal(true);
  };

  const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  };

  const handleAccept = () => {
    const rentData = {
      bookId: bookDetail.json?.id,
      userId: user?.id,
      loanDate: getFormattedDate(),
    };
    dispatch(rentBook(rentData)).then(() => {
      dispatch(getBookDetail(bookDetail.json?.id));
      dispatch(resetStatusRent());
    });
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleAuthorDetail = (authorId) => {
    dispatch(getAuthorDetail(authorId));
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (success || successDelete) {
      setNotification({
        message: "Operacion exitosa",
        type: "success",
      });
    }
    if (errorRent || errorDelete) {
      setNotification({
        message: errorRent ? errorRent.message : "Error Desconocido",
        type: "error",
      });
    }
    return () => {
      setNotification(null);
    };
  }, [errorRent, success, errorDelete, successDelete]);

  const handleEditClick = () => {
    sessionStorage.setItem("navigatedFromEditB", "true");
    navigate("/Book/Edit");
  };

  const handleDeleteClick = () => {
    dispatch(deleteBook(bookDetail.json?.id)).then(() => {
      dispatch(getBookDetail(bookDetail.json?.id));
      dispatch(resetStatusDelete());
    });
  };

  if (error || !bookDetail) {
    return <NotFound message="author" />;
  }

  return (
    <div className="book-detail-container">
      {loading && <Loader />}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
      {loading && <Loader />}
      <h1 className="book-title-a">{bookDetail.json?.title}</h1>
      <div className="book-detail-content">
        <div className="book-left">
          <img
            src={bookDetail.image}
            alt={bookDetail.json?.title}
            className="book-image"
          />
        </div>
        <div className="book-right">
          <div className="add-book-button-container">
            <div className="book-right-up">
              <p>
                <strong>Páginas:</strong> {bookDetail.json?.pages}
              </p>
              <p>
                <strong>ISBN:</strong> {bookDetail.json?.isbn}
              </p>
              <p>
                <strong>Editorial:</strong> {bookDetail.json?.publisher}
              </p>
              <p>
                <strong>Estado:</strong>{" "}
                {bookDetail.json?.isAvailable === true
                  ? "Disponible"
                  : "Prestado"}
              </p>
              <div className="author-container">
                <p style={{ marginBottom: "0px", marginTop: "0px" }}>
                  <strong>Autor: </strong>
                </p>
                {bookDetail.json?.Authors?.map((author, index) => (
                  <React.Fragment key={author.id}>
                    <NavLink
                      to={`/Author/Detail`}
                      className="author-link"
                      onClick={() => handleAuthorDetail(author.id)}
                    >
                      {author.firstName} {author.lastName}
                    </NavLink>
                    {index !== bookDetail.json.Authors.length - 1 && " "}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="buttons-container">
              {validateRoleLib && (
                <div className="buttons-container">
                  <button
                    className="add-book-button"
                    type="button"
                    onClick={handleEditClick}
                  >
                    Editar
                  </button>
                </div>
              )}
              {validateRoleUser && bookDetail.json?.isAvailable === true && (
                <div className="buttons-container">
                  <button
                    className="add-book-button"
                    onClick={handlePrestarClick}
                  >
                    Prestar
                  </button>
                </div>
              )}
              {validateRoleLib && bookDetail.json?.isAvailable === true && (
                <div className="buttons-container">
                  <button
                    className="add-book-button"
                    onClick={handleDeleteClick}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="book-summary">
            <h3>
              <strong>Sinopsis:</strong>
            </h3>
            <p>{bookDetail.json?.resume}</p>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">¿Seguro que desea tomar este libro?</h2>
            <div className="form-group">
              <label>el periodo de prestamo es de una semana (7dias) </label>
            </div>
            <div className="modal-buttons">
              <button onClick={handleAccept} className="btn-confirmar">
                Aceptar
              </button>
              <button onClick={handleCancel} className="btn-cancelar">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;

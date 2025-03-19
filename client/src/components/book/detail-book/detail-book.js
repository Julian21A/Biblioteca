import "./detail-book.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import NotFound from "../../shared/not-found/not-found";
import Loader from "../../shared/loader/loader";
import { getAuthorDetail } from "../../../redux/reducer/authorSlice";

const BookDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const { bookDetail, loading, error } = useSelector(
    (state) => state.books || {}
  );
  const { user } = useSelector((state) => state.auth || {});

  const validateRoleLib = user?.role === "ADMIN" || user?.role === "LIBRARIAN";

  const handlePrestarClick = () => {
    setShowModal(true);
  };

  const handleAccept = () => {
    console.log("Documento de identidad:", documentId);
    console.log("ID del libro:", bookDetail.json?.id);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleAuthorDetail = (authorId) => {
    dispatch(getAuthorDetail(authorId));
  };

  const handleEditClick = () => {
    sessionStorage.setItem("navigatedFromEditB", "true");
    navigate("/Book/Edit");
  };

  if (error || !bookDetail) {
    return <NotFound message="author" />;
  }

  return (
    <div className="book-detail-container">
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
                <strong>Disponibles:</strong> {bookDetail.json?.count}
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
            {validateRoleLib && (
              <div className="buttons-container">
                <button
                  className="add-book-button"
                  type="button"
                  onClick={handleEditClick}
                >
                  Editar
                </button>
                <button
                  className="add-book-button"
                  onClick={handlePrestarClick}
                >
                  Prestar
                </button>
              </div>
            )}
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
            <h2>Prestar Libro</h2>
            <div className="form-group">
              <label>Ingrese el documento de identidad del solicitante</label>
              <input
                type="text"
                value={documentId}
                onChange={(e) => setDocumentId(e.target.value)} // Actualiza el estado con el número de documento
                placeholder="Ingresa el número de documento"
                required
              />
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

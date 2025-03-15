import "./create-author.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAuthor,
  editAuthorDetail,
  resetAuthorDetail,
  resetStatus,
} from "../../../redux/reducer/authorSlice";
import Loader from "../../shared/loader/loader";
import { useNavigate } from "react-router-dom";
import Notification from "../../shared/notification/notification";

const CreateAuthor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [biography, setBiography] = useState("");
  const [librarianId, setLibrarianId] = useState("");
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authorDetail, loading, success, error } = useSelector(
    (state) => state.authors || {}
  );
  const [notification, setNotification] = useState(null);
  const { user } = useSelector((state) => state.auth || {});
  const validateRoleLib = user?.role === "ADMIN" || user?.role === "LIBRARIAN";

  useEffect(() => {
    if (authorDetail && validateRoleLib) {
      setFirstName(authorDetail.firstName || "");
      setLastName(authorDetail.lastName || "");
      setBiography(authorDetail.biography || "");
      setLibrarianId(authorDetail.librarianId || "");
      setImage(authorDetail.image || null);
    }
  }, [authorDetail, validateRoleLib]);

  useEffect(() => {
    if (success) {
      setFirstName("");
      setLastName("");
      setBiography("");
      setLibrarianId("");
      setImage(null);
      setNotification({
        message: "Operación exitosa",
        type: "success",
      });
    }
    if (error) {
      setNotification({
        message: error ? error.message : "Error Desconocido",
        type: "error",
      });
    }
    return () => {
      setTimeout(() => dispatch(resetStatus()), 3000);
      setTimeout(() => dispatch(resetAuthorDetail()), 1000);
      setNotification(null);
    };
  }, [dispatch, success, error]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleImageDelete = () => {
    setImage(null);
  };

  const handleBack = () => {
    navigate(`/Author/Detail`);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const newData = {
      firstName,
      lastName,
      biography,
      librarianId,
      image,
    };
    dispatch(editAuthorDetail(newData)).then(() => {
      navigate("/");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAuthor = {
      firstName,
      lastName,
      biography,
      librarianId,
      image,
    };
    dispatch(addAuthor(newAuthor)).then(() => {});
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit} className="author-form">
      {loading && <Loader />}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
      <div>
        {authorDetail && validateRoleLib ? (
          <h1 className="titlepage">Editar Autor</h1>
        ) : (
          <h1 className="titlepage">Agregar Autor</h1>
        )}

        <div
          className={`drop-zone ${dragging ? "dragging" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {image ? (
            <div>
              <p>{image.name}</p>
              <button
                className="x-but"
                type="button"
                onClick={handleImageDelete}
              >
                X
              </button>
            </div>
          ) : (
            <p className="referenceInput">Arrastra y suelta una imagen aquí</p>
          )}
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
      </div>
      <div className="form-fields">
        <label className="formTitle">
          Nombre:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label className="formTitle">
          Apellido:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label className="formTitle">
          Bibliotecario:
          <input
            type="number"
            value={librarianId}
            onChange={(e) => setLibrarianId(e.target.value)}
            required
          />
        </label>
        <label className="formTitle">
          Biografía:
          <textarea
            className="text-bio"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            required
            rows="4"
            cols="50"
          />
        </label>

        {authorDetail && validateRoleLib ? (
          <div className="button-edit-container">
            <button className="cBook" type="button" onClick={handleEdit}>
              Editar Autor
            </button>
            <button className="cBook" type="button" onClick={handleBack}>
              Cancelar
            </button>
          </div>
        ) : (
          <button className="cBook" type="submit">
            Agregar Autor
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateAuthor;

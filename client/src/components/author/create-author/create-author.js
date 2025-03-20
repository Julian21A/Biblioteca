import "./create-author.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAuthor,
  editAuthorDetail,
  resetStatus,
} from "../../../redux/reducer/authorSlice";
import Loader from "../../shared/loader/loader";
import { useNavigate } from "react-router-dom";
import Notification from "../../shared/notification/notification";

/**
 * Componente para crear o editar un autor.
 * Permite ingresar información del autor, subir una imagen y enviarla al backend.
 *
 * @component
 */
const CreateAuthor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [biography, setBiography] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [dragging, setDragging] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authorDetail, loading, success, error } = useSelector(
    (state) => state.authors || {}
  );
  const [notification, setNotification] = useState(null);
  const { user } = useSelector((state) => state.auth || {});
  const [librarianId, setLibrarianId] = useState(user?.id);
  const validateRoleLib = user?.role === "ADMIN" || user?.role === "LIBRARIAN";

  /**
   * Efecto para cargar los datos del autor si se está editando.
   */
  useEffect(() => {
    if (authorDetail && validateRoleLib) {
      setId(authorDetail.json?.id || null);
      setFirstName(authorDetail.json?.firstName || "");
      setLastName(authorDetail.json?.lastName || "");
      setBiography(authorDetail.json?.biography || "");
    }
  }, [authorDetail, validateRoleLib]);

  /**
   * Efecto para manejar notificaciones de éxito o error y limpiar el estado.
   */
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
      setNotification(null);
    };
  }, [dispatch, success, error]);

  /**
   * Efecto para limpiar el estado cuando se desmonta el componente.
   */
  useEffect(() => {
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch]);

  /**
   * Maneja el evento de soltar un archivo en el área de arrastrar y soltar.
   * @param {Event} e - Evento de arrastre.
   */
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
    }
  };

  /**
   * Maneja el evento de arrastrar sobre el área de soltar.
   * @param {Event} e - Evento de arrastre.
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  /**
   * Maneja la salida del área de arrastrar y soltar.
   */
  const handleDragLeave = () => {
    setDragging(false);
  };

  /**
   * Maneja la eliminación de la imagen seleccionada.
   */
  const handleImageDelete = () => {
    setImage(null);
  };

  /**
   * Navega de regreso a la lista de autores.
   */
  const handleBack = () => {
    navigate(`/Author/Detail`);
  };

  /**
   * Maneja la edición de un autor existente.
   * @param {Event} e - Evento de envío del formulario.
   */
  const handleEdit = (e) => {
    e.preventDefault();
    const newData = {
      firstName,
      lastName,
      biography,
      librarianId,
      image,
    };
    dispatch(editAuthorDetail({ formData: newData, authorId: id })).then(() => {
      navigate("/");
    });
  };

  /**
   * Maneja la creación de un nuevo autor.
   * @param {Event} e - Evento de envío del formulario.
   */
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

  /**
   * Cierra la notificación de éxito o error.
   */
  const handleCloseNotification = () => {
    setNotification(null);
  };

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
        {authorDetail.json?.firstName && validateRoleLib ? (
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

        {authorDetail.json?.firstName && validateRoleLib ? (
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

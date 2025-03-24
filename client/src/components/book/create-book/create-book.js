import "./create-book.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBook,
  resetStatus,
  resetBookDetail,
  editBookDetail,
} from "../../../redux/reducer/bookSlice";
import Loader from "../../shared/loader/loader";
import { useNavigate } from "react-router-dom";
import Notification from "../../shared/notification/notification";
import {
  getAllAuthors,
  resetAuthorNames,
} from "../../../redux/reducer/authorSlice";
import Select from "react-select";

/**
 * Componente para la creación y edición de libros.
 * @component
 * @returns {JSX.Element} Formulario para agregar o editar un libro.
 */
const CreateBook = () => {
  /** Estados locales para almacenar información del libro */
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publisher, setPublisher] = useState("");
  const [resume, setResume] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [selectedAuthorIds, setSelectedAuthorIds] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bookDetail, loading, success, error } = useSelector(
    (state) => state.books || {}
  );
  const { authorNames } = useSelector((state) => state.authors || {});
  const { user } = useSelector((state) => state.auth || {});

  /** Verifica si el usuario tiene rol de ADMIN o LIBRARIAN */
  const validateRoleLib = user?.role === "ADMIN" || user?.role === "LIBRARIAN";

  /** Estado local para la notificación de operaciones */
  const [notification, setNotification] = useState(null);

  /**
   * Genera las opciones para el selector de autores.
   * @type {Array<{value: number, label: string}>}
   */
  const authorOptions = authorNames?.map((author) => ({
    value: author.id,
    label: `${author.firstName} ${author.lastName}`,
  }));

  /**
   * Filtra las opciones seleccionadas de autores.
   * @type {Array<{value: number, label: string}>}
   */
  const filteredOptions =
    authorOptions?.filter((option) =>
      selectedAuthorIds.includes(option.value)
    ) || [];

  /**
   * Maneja la selección de autores.
   * @param {Array<{value: number, label: string}>} selectedOptions - Autores seleccionados.
   */
  const handleAuthorSelect = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    setSelectedAuthorIds(selectedIds);
  };

  /**
   * Efecto para obtener la lista de autores al cargar el componente.
   */
  useEffect(() => {
    dispatch(getAllAuthors());
  }, [dispatch]);

  /**
   * Efecto para inicializar los datos del formulario cuando se edita un libro.
   */
  useEffect(() => {
    if (bookDetail && validateRoleLib) {
      setTitle(bookDetail?.json?.title || "");
      setId(bookDetail?.json?.id || null);
      setSelectedAuthorIds(
        bookDetail?.json?.Authors?.map((author) => author.id) || []
      );
      setPages(bookDetail?.json?.pages || "");
      setIsbn(bookDetail?.json?.isbn || "");
      setPublisher(bookDetail?.json?.publisher || "");
      setResume(bookDetail?.json?.resume || "");
    }
  }, [bookDetail, validateRoleLib, dispatch]);

  /**
   * Maneja la acción de soltar un archivo en la zona de carga de imágenes.
   * @param {Event} e - Evento de arrastrar y soltar.
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
   * Maneja la acción de arrastrar sobre la zona de carga de imágenes.
   * @param {Event} e - Evento de arrastrar.
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  /**
   * Maneja la salida del área de arrastre.
   */
  const handleDragLeave = () => {
    setDragging(false);
  };

  /**
   * Elimina la imagen seleccionada.
   */
  const handleImageDelete = () => {
    setImage(null);
  };

  /**
   * Navega a la página de detalle del libro.
   */
  const handleBack = () => {
    navigate(`/Book/Detail`);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const newData = {
      title,
      pages: parseInt(pages, 10),
      isbn,
      publisher,
      resume,
      image,
      authorIds: selectedAuthorIds,
    };
    dispatch(editBookDetail({ formData: newData, bookId: id })).then(() => {
      navigate("/");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      title,
      pages: parseInt(pages, 10),
      isbn,
      publisher,
      resume,
      image,
      authorIds: selectedAuthorIds,
      dateAdded: new Date().toISOString(),
    };
    dispatch(addBook(newBook));
  };

  /**
   * Cierra la notificación activa.
   */
  const handleCloseNotification = () => {
    setNotification(null);
  };

  /**
   * Efecto para manejar la notificación de éxito o error.
   */
  useEffect(() => {
    if (success) {
      setTitle("");
      setPages("");
      setIsbn("");
      setSelectedAuthorIds([]);
      setPublisher("");
      setResume("");
      setImage(null);
      setNotification({
        message: "Operacion exitosa",
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
  }, [success, error]);

  /**
   * Efecto para resetear el estado de los autores y libros al desmontar el componente.
   */
  useEffect(() => {
    return () => {
      dispatch(resetAuthorNames());
      dispatch(resetStatus());
    };
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit} className="book-form">
      {loading && <Loader />}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
      <div>
        {bookDetail?.json?.title && validateRoleLib ? (
          <h1 className="titlepage">Editar Libro</h1>
        ) : (
          <h1 className="titlepage">Agregar Libro</h1>
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
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label className="formTitle">
          Autores Referidos:
          <Select
            isMulti
            value={filteredOptions}
            options={authorOptions}
            onChange={handleAuthorSelect}
            placeholder="Selecciona uno o más autores"
            required
          />
        </label>

        <label className="formTitle">
          Páginas:
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            required
          />
        </label>
        <label className="formTitle">
          ISBN:
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </label>
        <label className="formTitle">
          Editorial:
          <input
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            required
          />
        </label>
        <label className="formTitle">
          Resumen:
          <textarea
            className="text-bio"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            required
            rows="4"
            cols="50"
          />
        </label>
        {bookDetail?.json?.title && validateRoleLib ? (
          <div className="button-edit-container">
            <button className="cBook" type="button" onClick={handleEdit}>
              Editar Libro
            </button>
            <button className="cBook" type="button" onClick={handleBack}>
              Cancelar
            </button>
          </div>
        ) : (
          <button className="cBook" type="submit">
            Agregar Libro
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateBook;

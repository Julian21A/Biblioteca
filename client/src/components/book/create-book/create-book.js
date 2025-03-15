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
import { getAllAuthors } from "../../../redux/reducer/authorSlice";
import Select from "react-select";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publisher, setPublisher] = useState("");
  const [resume, setResume] = useState("");
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [selectedAuthorIds, setSelectedAuthorIds] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookDetail, loading, success, error } = useSelector(
    (state) => state.books || {}
  );
  const { authorNames } = useSelector((state) => state.authors || {});
  const { user } = useSelector((state) => state.auth || {});
  const validateRoleLib = user?.role === "ADMIN" || user?.role === "LIBRARIAN";
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    dispatch(getAllAuthors());
    if (bookDetail && validateRoleLib) {
      setTitle(bookDetail.title || "");
      setSelectedAuthorIds(bookDetail.authorIds || []);
      setPages(bookDetail.pages || "");
      setIsbn(bookDetail.isbn || "");
      setPublisher(bookDetail.publisher || "");
      setResume(bookDetail.resume || "");
      setImage(bookDetail.image || null);
    }
  }, [bookDetail, validateRoleLib, dispatch]);

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
    dispatch(editBookDetail(newData)).then(() => {
      if (success) {
        setTitle("");
        setPages("");
        setIsbn("");
        setPublisher("");
        setResume("");
        setImage(null);
        setTimeout(() => dispatch(resetStatus()), 3000);
        setTimeout(() => dispatch(resetBookDetail()), 1000);
      }
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
    dispatch(addBook(newBook)).then(() => {
      if (success) {
        setTitle("");
        setPages("");
        setIsbn("");
        setPublisher("");
        setResume("");
        setImage(null);
        setTimeout(() => dispatch(resetStatus()), 3000);
      }
    });
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (success) {
      setNotification({
        message: "Operacion exitosa",
        type: "success",
      });
    }
    if (error) {
      setNotification({
        message: error ? error : "Error Desconocido",
        type: "error",
      });
    }
    return () => {
      setNotification(null);
    };
  }, [success, error]);

  useEffect(() => {
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch]);

  const authorOptions = authorNames?.map((author) => ({
    value: author.id,
    label: `${author.firstName} ${author.lastName}`,
  }));

  const filteredOptions = authorOptions?.filter((option) =>
    selectedAuthorIds.includes(option.value)
  ) || [];

  const handleAuthorSelect = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    setSelectedAuthorIds(selectedIds);
  };

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
        {bookDetail && validateRoleLib ? (
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
        {bookDetail && validateRoleLib ? (
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

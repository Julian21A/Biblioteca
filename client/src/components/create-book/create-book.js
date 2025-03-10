import "./create-book.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook, resetStatus } from "../../redux/reducer/bookSlice";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publisher, setPublisher] = useState("");
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const dispatch = useDispatch();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      title,
      pages: parseInt(pages, 10),
      isbn,
      publisher,
      image,
      dateAdded: new Date().toISOString(),
    };
    dispatch(addBook(newBook)).then(() => {
      setTitle('');
      setPages('');
      setIsbn('');
      setPublisher('');
      setImage(null);
      setTimeout(() => dispatch(resetStatus()), 3000);
  });;
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <div>
        <h1 className="titlepage">Agregar Libro</h1>
        <div
          className={`drop-zone ${dragging ? "dragging" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {image ? (
            <p>{image.name}</p>
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
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
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
        <button className="cBook" type="submit">Agregar Libro</button>
      </div>
    </form>
  );
};

export default CreateBook;

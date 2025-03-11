import "./search-author.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAuthorInfo, resetAuthors } from "../../../redux/reducer/authorSlice";

const SearchAuthor = () => {
  const [name, setName] = useState("");
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();
  const { authorData, loading, error } = useSelector((state) => state.book || {});

  // authorData = [
  //   {
  //     name: "paquito",
  //     count: 20,
  //   },
  //   {
  //     name: "me",
  //     count: 200,
  //   },
  // ];

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAuthorInfo(name));
    setSearched(true);
  };

  const handleClearSearch = () => {
    setName("");
    setSearched(false);
    dispatch(resetAuthors());
  };

  return (
    <div>
      <div className="card-search">
        <h1 className="title-page">Buscar Autor</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <button className="bton-search" type="submit">
              Buscar
            </button>
            {searched && (
              <button className="bton-search" onClick={handleClearSearch}>
                Reiniciar
              </button>
            )}
          </div>
        </form>
      </div>
      {loading && <p>Cargando...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {authorData?.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th># Libros</th>
            </tr>
          </thead>
          <tbody>
            {authorData.map((author) => (
              <tr key={author.id}>
                <td>
                  <NavLink
                    className="table-index"
                    to={`/Author/Detail/${author.name}`}
                  >
                    {author.name}
                  </NavLink>
                </td>
                <td>{author.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchAuthor;

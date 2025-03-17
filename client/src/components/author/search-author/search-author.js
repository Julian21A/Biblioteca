import "./search-author.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getAuthorInfo,
  resetAuthors,
  getAuthorDetail,
} from "../../../redux/reducer/authorSlice";
import Loader from "../../shared/loader/loader";
import Notification from "../../shared/notification/notification";

const SearchAuthor = () => {
  const [firstName, setfirstName] = useState("");
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();
  const { authorData, loading, error } = useSelector(
    (state) => state.authors || {}
  );

  const [notification, setNotification] = useState(null);

  const handleAuthorDetail = (authorId) => {
    dispatch(getAuthorDetail(authorId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAuthorInfo(firstName));
    setSearched(true);
  };

  const handleClearSearch = () => {
    setfirstName("");
    setSearched(false);
    dispatch(resetAuthors());
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (error) {
      setNotification({
        message: error ? error : "Error Desconocido",
        type: "error",
      });
    }
    return () => {
      setNotification(null);
    };
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthors());
    };
  }, [dispatch]);

  return (
    <div>
      {loading && <Loader />}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
      <div className="card-search">
        <h1 className="title-page">Buscar Autor</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="name-input"
              type="text"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
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

      {authorData.length > 0 && (
        <div className="search-table-container">
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
                      to={`/Author/Detail`}
                      onClick={() => handleAuthorDetail(author.id)}
                    >
                      {author.firstName} {author.lastName}
                    </NavLink>
                  </td>
                  <td>{author.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchAuthor;

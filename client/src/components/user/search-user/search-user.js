import "./search-user.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, resetUsers } from "../../../redux/reducer/userSlice";
import Loader from "../../shared/loader/loader";

const SearchUser = () => {
  const [documentNumber, setDocumentNumber] = useState("");
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector(
    (state) => state.books || {}
  );

  const roleMapping = {
    user: "Usuario",
    librarian: "Bibliotecario",
    admin: "Administrador",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUserInfo(documentNumber));
    setSearched(true);
  };

  const handleClearSearch = () => {
    setDocumentNumber("");
    setSearched(false);
    dispatch(resetUsers());
  };

  useEffect(() => {
    return () => {
      dispatch(resetUsers());
    };
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="card-search">
        <h1 className="title-page">Buscar Usuario</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className="name-input"
              type="text"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
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
      {userData?.length > 0 && (
        <div className="search-table-container">
          <table>
            <thead>
              <tr>
                <th>Documento</th>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Rol</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id}>
                  <td>{user.numberId}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.userName}</td>
                  <td>{roleMapping[user.role] || user.role}</td>
                  <td>
                    <button className="bton-search" type="button">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchUser;

import "./search-user.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetail,
  getUserInfo,
  resetUsers,
} from "../../../redux/reducer/userSlice";
import Loader from "../../shared/loader/loader";
import { useNavigate } from "react-router-dom";
import Notification from "../../shared/notification/notification";

const SearchUser = () => {
  const [documentNumber, setDocumentNumber] = useState("");
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, loading, error } = useSelector((state) => state.user || {});
  const { user } = useSelector((state) => state.auth || {});
  const [notification, setNotification] = useState(null);
  const validateRoleAdmin = user?.role === "ADMIN";
  const roleMapping = {
    USER: "Usuario",
    LIBRARIAN: "Bibliotecario",
    ADMIN: "Administrador",
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

  const handleClickEdit = () => {
    dispatch(getUserDetail());
    navigate("/User/Edit");
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    console.log(error);
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
      dispatch(resetUsers());
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
                {validateRoleAdmin && <th></th>}
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id}>
                  <td>{user.documentNumber}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.userName}</td>
                  <td>{roleMapping[user.role] || user.role}</td>
                  {validateRoleAdmin && (
                    <td>
                      <button
                        className="bton-search"
                        type="button"
                        onClick={handleClickEdit}
                      >
                        Editar
                      </button>
                    </td>
                  )}
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

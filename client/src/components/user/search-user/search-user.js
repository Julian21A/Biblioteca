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

/**
 * Componente para la búsqueda de usuarios.
 *
 * Permite buscar usuarios por número de documento, mostrando su información si está registrado.
 * También ofrece opciones para editar el usuario si se tienen los permisos adecuados.
 *
 * @component
 * @returns {JSX.Element} Componente de búsqueda de usuario.
 */
const SearchUser = () => {
  const [documentNumber, setDocumentNumber] = useState("");
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** Estado global de usuario y autenticación */
  const { userData, loading, error } = useSelector((state) => state.user || {});
  const { user } = useSelector((state) => state.auth || {});
  const [notification, setNotification] = useState(null);
  const validateRoleAdmin = user?.role === "ADMIN";

  /** Mapeo de roles a nombres legibles */
  const roleMapping = {
    USER: "Usuario",
    LIBRARIAN: "Bibliotecario",
    ADMIN: "Administrador",
  };

  /**
   * Maneja la búsqueda de un usuario por número de documento.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Evento del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getUserInfo(documentNumber));
    setSearched(true);
  };

  /**
   * Limpia la búsqueda actual y reinicia el estado.
   */
  const handleClearSearch = () => {
    setDocumentNumber("");
    setSearched(false);
    dispatch(resetUsers());
  };

  /**
   * Redirige a la página de edición del usuario seleccionado.
   */
  const handleClickEdit = () => {
    dispatch(getUserDetail());
    navigate("/User/Edit");
  };

  /**
   * Cierra la notificación de error.
   */
  const handleCloseNotification = () => {
    setNotification(null);
  };

  /**
   * Maneja los errores y muestra una notificación si es necesario.
   */
  useEffect(() => {
    if (error) {
      setNotification({
        message: error ? error.message : "Error Desconocido",
        type: "error",
      });
    }
    return () => {
      setNotification(null);
    };
  }, [error]);

  /**
   * Resetea la lista de usuarios al desmontar el componente.
   */
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

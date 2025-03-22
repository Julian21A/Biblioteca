import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserDetail,
  registerUser,
  resetUserDetail,
  resetUserState,
} from "../../../redux/reducer/userSlice.js";
import "./register-user.css";
import Loader from "../../shared/loader/loader.js";
import { useNavigate } from "react-router-dom";
import Notification from "../../shared/notification/notification.js";

/**
 * Componente para el registro y edición de usuarios.
 *
 * Permite registrar o editar usuarios con los campos de email, nombre, contraseña,
 * rol y número de documento. Gestiona notificaciones de éxito o error y maneja
 * la navegación después de la operación.
 *
 * @component
 * @returns {JSX.Element} Componente de registro de usuario.
 */
const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** Estado global de usuario y autenticación */
  const { userDetail, loading, error, success } = useSelector(
    (state) => state.user
  );
  const { user } = useSelector((state) => state.auth);
  const [notification, setNotification] = useState(null);
  const validateUserLib = user?.role === "ADMIN" || user?.role === "LIBRARIAN";

  /**
   * Carga los datos del usuario en el formulario si existe `userDetail`.
   */
  useEffect(() => {
    if (userDetail) {
      setEmail(userDetail.email || "");
      setName(userDetail.name || "");
      setPassword(userDetail.password || "");
      setRole(userDetail.role || "");
      setDocumentNumber(userDetail.documentNumber || "");
    }
  }, [userDetail]);

  /**
   * Maneja los cambios de estado tras una operación exitosa o fallida.
   */
  useEffect(() => {
    if (success) {
      setEmail("");
      setName("");
      setPassword("");
      setRole("");
      setDocumentNumber("");
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
      setTimeout(() => dispatch(resetUserState()), 3000);
      setTimeout(() => dispatch(resetUserDetail()), 1000);
      setNotification(null);
    };
  }, [dispatch, success, error]);

  /**
   * Maneja el regreso a la página de búsqueda de usuarios.
   */
  const handleBack = () => {
    navigate("/User/Search");
  };

  /**
   * Maneja la edición de un usuario existente.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Evento del formulario.
   */
  const handleEdit = (e) => {
    e.preventDefault();
    const newData = { email, name, password, role, documentNumber };
    dispatch(editUserDetail(newData)).then(() => {
      navigate("/");
    });
  };

  /**
   * Maneja el registro de un nuevo usuario.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Evento del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, name, password, role, documentNumber };
    dispatch(registerUser(userData)).then(() => {});
  };

  /**
   * Cierra la notificación de error o éxito.
   */
  const handleCloseNotification = () => {
    setNotification(null);
  };

  /**
   * Resetea el estado del usuario al desmontar el componente.
   */
  useEffect(() => {
    return () => {
      dispatch(resetUserState());
    };
  }, [dispatch]);

  return (
    <div className="register-container">
      {loading && <Loader />}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
      {userDetail && validateUserLib ? (
        <h1 className="register-title">Editar Usuario</h1>
      ) : (
        <h1 className="register-title">Registro de Usuario</h1>
      )}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label className="lable-reg">Nombre</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="lable-reg">Número de Documento</label>
          <input
            type="text"
            name="documentNumber"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="lable-reg">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="lable-reg">Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="lable-reg">Rol</label>
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="USER">Usuario</option>
            <option value="LIBRARIAN">Bibliotecario</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>
        {userDetail && validateUserLib ? (
          <div className="button-edit-container">
            <button className="cBook" type="button" onClick={handleEdit}>
              Editar Usuario
            </button>
            <button className="cBook" type="button" onClick={handleBack}>
              Cancelar
            </button>
          </div>
        ) : (
          <div className="form-actions">
            <button
              className="submit-register"
              type="submit"
              disabled={loading}
            >
              Registrar
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserRegister;

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

const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetail, loading, error, success } = useSelector(
    (state) => state.user
  );
  const { user } = useSelector((state) => state.auth);
  const [notification, setNotification] = useState(null);
  const validateUserLib = user?.role === "ADMIN" || user?.role === "LIBRARIAN";

  useEffect(() => {
    if (userDetail) {
      setEmail(userDetail.email || "");
      setName(userDetail.name || "");
      setPassword(userDetail.password || "");
      setRole(userDetail.role || "");
      setDocumentNumber(userDetail.documentNumber || "");
    }
  }, [userDetail]);

  useEffect(() => {
    if (success) {
      setEmail("");
      setName("");
      setPassword("");
      setRole("");
      setDocumentNumber("");
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
      setTimeout(() => dispatch(resetUserState()), 3000);
      setTimeout(() => dispatch(resetUserDetail()), 1000);
      setNotification(null);
    };
  }, [dispatch, success, error]);

  const handleBack = () => {
    navigate("/User/Search");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const newData = {
      email,
      name,
      password,
      role,
      documentNumber,
    };
    dispatch(editUserDetail(newData)).then(() => {
      navigate("/");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      name,
      password,
      role,
      documentNumber,
    };
    dispatch(registerUser(userData)).then(() => {});
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

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

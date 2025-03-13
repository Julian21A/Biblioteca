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

  useEffect(() => {
    if (userDetail) {
      setEmail(userDetail.email || "");
      setName(userDetail.name || "");
      setPassword(userDetail.password || "");
      setRole(userDetail.role || "");
      setDocumentNumber(userDetail.documentNumber || "");
    }
  }, [userDetail]);

  const handleBack = () => {
    navigate(`/User/Search`);
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
      if (success) {
        setEmail("");
        setName("");
        setPassword("");
        setRole("");
        setDocumentNumber("");
        setTimeout(() => dispatch(resetUserState()), 3000);
        setTimeout(() => dispatch(resetUserDetail()), 1000);
      }
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
    dispatch(registerUser(userData)).then(() => {
      if (success) {
        setEmail("");
        setName("");
        setPassword("");
        setRole("");
        setDocumentNumber("");
        setTimeout(() => dispatch(resetUserState()), 3000);
      }
    });
  };

  useEffect(() => {
    return () => {
      dispatch(resetUserState());
    };
  }, [dispatch]);

  return (
    <div className="register-container">
      {userDetail ? (
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
            <option value="user">Usuario</option>
            <option value="librarian">Bibliotecario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        {userDetail ? (
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

      {loading && <Loader />}
      {error && <p className="error-message">{error}</p>}
      {success && (
        <p className="success-message">Usuario registrado exitosamente</p>
      )}
    </div>
  );
};

export default UserRegister;

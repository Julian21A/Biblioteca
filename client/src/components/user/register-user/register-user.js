import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  resetUserState,
} from "../../../redux/reducer/userSlice.js";
import "./register-user.css";
import Loader from "../../shared/loader/loader.js";

const UserRegister = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    role: "user",
    documentNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    return () => {
      dispatch(resetUserState());
    };
  }, [dispatch]);

  return (
    <div className="register-container">
      <h2 className="register-title">Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label className="lable-reg">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="lable-reg">Número de Documento</label>
          <input
            type="text"
            name="documentNumber"
            value={formData.documentNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="lable-reg">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="lable-reg">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="lable-reg">Rol</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="user">Usuario</option>
            <option value="librarian">Bibliotecario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div className="form-actions">
          <button className="submit-register" type="submit" disabled={loading}>
            Registrar
          </button>
        </div>
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

import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginUser } from "../../redux/reducer/authSlice";
import { useNavigate } from "react-router-dom";
import book from "../../assets/grimorio.png";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.auth);

  /**
   * Maneja los cambios en los campos de entrada del formulario.
   *
   * Esta función se ejecuta cada vez que un usuario cambia el valor de un campo en el formulario.
   * Actualiza el estado `userData` con los nuevos valores proporcionados por el usuario.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - El objeto del evento que contiene la información del campo de entrada modificado.
   * @returns {void} No retorna ningún valor. Solo actualiza el estado `userData`.
   */
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Maneja el envío del formulario de login.
   *
   * Esta función se ejecuta cuando el usuario envía el formulario de login.
   * Previene el comportamiento por defecto del formulario (recargar la página),
   * realiza una llamada a la acción `loginUser` para autenticar al usuario
   * y redirige al usuario a la página principal si la autenticación es exitosa.
   *
   * @param {Event} e - El objeto del evento que representa el envío del formulario.
   * @returns {Promise<void>} No retorna ningún valor.
   * En caso de error, el flujo se maneja dentro del bloque `catch`.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(userData));
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className="card">
      <img src={book} className="card-img-top" alt="aqui va un libro" />
      <div className="card-body">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="input-form">
              <label htmlFor="email" className="form-label">
                E-mail:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="email"
              />
            </div>
            <div className="input-form">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="*********"
              />
            </div>
            <div className="error-container">
              {error && <span className="error-alert">{error}</span>}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Aceptar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

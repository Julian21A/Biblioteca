import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginUser } from "../../redux/reducer/authSlice";
import { useNavigate } from "react-router-dom";
import book from "../../assets/grimorio.png";
import Notification from "../shared/notification/notification";

/**
 * Componente de formulario de inicio de sesión.
 * Permite a los usuarios ingresar su email y contraseña para autenticarse en la aplicación.
 *
 * @component
 * @returns {JSX.Element} Formulario de inicio de sesión.
 */
export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.auth);
  const [notification, setNotification] = useState(null);

  /**
   * Maneja los cambios en los campos de entrada del formulario.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio en el campo de entrada.
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
   * @param {Event} e - Evento del formulario.
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(userData));
      navigate("/");
    } catch (err) {}
  };

  /**
   * Cierra la notificación activa.
   */
  const handleCloseNotification = () => {
    setNotification(null);
  };

  /**
   * Efecto que gestiona la visualización de errores mediante notificaciones.
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

  return (
    <div className="card">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
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
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Aceptar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

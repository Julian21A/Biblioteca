import "./not-found.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import burn from "../../../assets/burning-page.png";

/**
 * Componente `NotFound`.
 *
 * Muestra una página de error cuando la ruta visitada no existe.
 *
 * @component
 * @returns {JSX.Element} Página de error con un botón para regresar al inicio.
 */
const NotFound = () => {
  const navigate = useNavigate();

  /**
   * Redirige al usuario a la página de inicio.
   */
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <img src={burn} alt="Not Found" className="not-found-image" />
        <h2 className="not-found-text">Esta página no existe</h2>
        <button className="go-home-button" onClick={handleGoHome}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default NotFound;

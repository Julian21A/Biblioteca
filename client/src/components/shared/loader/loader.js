import React from "react";
import "./loader.css";
import loaderGif from "../../../assets/loading.gif";

/**
 * Componente de carga (`Loader`).
 *
 * Muestra una animación de carga para indicar que una acción está en proceso.
 *
 * @component
 * @returns {JSX.Element} Elemento visual de carga.
 */
const Loader = () => {
  return (
    <div className="loader-container">
      <img src={loaderGif} alt="Cargando..." className="loader-image" />
    </div>
  );
};

export default Loader;

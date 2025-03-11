import React from "react";
import "./loader.css";
import loaderGif from "../../../assets/loading.gif";

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={loaderGif} alt="Cargando..." className="loader-image" />
    </div>
  );
};

export default Loader;

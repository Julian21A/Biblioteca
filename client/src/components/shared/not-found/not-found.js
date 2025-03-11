import "./not-found.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import burn from "../../../assets/burning-page.png";

const NotFound = ({ message = "default" }) => {
  let messageShow = "Esta página no existe";
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  switch (message) {
    case "author":
      messageShow = "Autor no encontrado";
      break;
    case "book":
      messageShow = "Libro no encontrado";
      break;
    default:
      break;
  }

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <img src={burn} alt="Not Found" className="not-found-image" />
        <h2 className="not-found-text">{messageShow}</h2>
        <button className="go-home-button" onClick={handleGoHome}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default NotFound;

import React, { useEffect } from "react";
import "./notification.css";

/**
 * Componente `Notification`.
 *
 * Muestra un mensaje de notificación en la pantalla con una opción para cerrarlo manualmente.
 * La notificación se cierra automáticamente después de 5 segundos.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.message - Mensaje que se mostrará en la notificación.
 * @param {string} props.type - Tipo de notificación (por ejemplo, "success", "error").
 * @param {Function} props.onClose - Función para cerrar la notificación manualmente.
 * @returns {JSX.Element} Elemento de la notificación.
 */
const Notification = ({ message, type, onClose }) => {
  /**
   * Efecto que configura un temporizador para cerrar la notificación automáticamente.
   * @effect
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button className="close-btn" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Notification;

import React from "react";
import "./home.css";
import wallpaper from "../../assets/asian.jpg";
import logo from "../../assets/logo.png";

/**
 * Componente de pantalla de inicio.
 * Muestra una imagen de fondo y el logo de la aplicación.
 *
 * @component
 * @returns {JSX.Element} Componente de la pantalla de inicio.
 */
export function Home() {
  return (
    <div className="image-container">
      <img
        className="home-splash"
        id="home-splash"
        src={wallpaper}
        alt="wallpaper"
      />
      <div className="logo-space">
        <img className="logo" id="logo" src={logo} alt="wallpaper" />
      </div>
    </div>
  );
}

export default Home;

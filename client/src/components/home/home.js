import React from "react";
import "./home.css";
import wallpaper from "../../assets/asian.jpg";
import logo from "../../assets/logo.png";

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

import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets.js";

import "./navbar.css";

export default function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("app")}
          className={menu === "app" ? "active" : ""}
        >
          app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          contact
        </a>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>

        <button onClick={() => setShowLogin(true)}>sign in</button>
      </div>
    </div>
  );
}

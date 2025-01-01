import { useState } from "react";

import { assets } from "../../assets/assets.js";

import "./navbar.css";

export default function Navbar() {
    const [menu, setMenu] = useState("home");

    return (
        <div className="navbar">
            <img src={assets.logo} alt="" className="logo" />

            <ul className="navbar-menu">
                <li
                    onClick={() => setMenu("home")}
                    className={menu === "home" ? "active" : ""}
                >
                    home
                </li>
                <li
                    onClick={() => setMenu("menu")}
                    className={menu === "menu" ? "active" : ""}
                >
                    menu
                </li>
                <li
                    onClick={() => setMenu("app")}
                    className={menu === "app" ? "active" : ""}
                >
                    app
                </li>
                <li
                    onClick={() => setMenu("contact")}
                    className={menu === "contact" ? "active" : ""}
                >
                    contact
                </li>
            </ul>

            <div className="navbar-right">
                <div className="navbar-search-icon">
                    <img src={assets.basket_icon} alt="" />
                    <div className="dot"></div>
                </div>

                <button>sign in</button>
            </div>
        </div>
    );
}

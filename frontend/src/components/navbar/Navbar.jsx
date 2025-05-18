import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import { StoreContext } from "../../context/StoreContext.jsx";
import "./navbar.css";

export default function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  // Function to handle the Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>

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
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>

              <hr />

              <li onClick={handleLogout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

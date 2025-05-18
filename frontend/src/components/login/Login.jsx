import { useContext, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./login.css";

const Login = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign up");

  const { url, setToken } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();
    let newURL = url;

    if (currState === "Sign up") {
      newURL += "/api/user/register";
    } else {
      newURL += "/api/user/login";
    }

    const response = await axios.post(newURL, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLoginHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Popup close icon"
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign up" ? (
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              placeholder="Your name"
              required
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Your password"
            required
          />
        </div>

        <button type="submit">
          {currState === "Sign up" ? "Create account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Sign up" ? (
          <p>
            Already have an account{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        ) : (
          <p>
            Create a new account{" "}
            <span onClick={() => setCurrState("Sign up")}>Click here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;

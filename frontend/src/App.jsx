import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

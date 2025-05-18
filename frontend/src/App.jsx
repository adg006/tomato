import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Cart from "./pages/cart/Cart";
import Order from "./pages/order/Order";
import Verify from "./pages/verify/Verify";
import MyOrders from "./pages/myOrders/MyOrders";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

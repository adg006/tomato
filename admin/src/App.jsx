import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar/Navbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Add from "./pages/add/Add.jsx";
import List from "./pages/list/List.jsx";
import Orders from "./pages/orders/Orders.jsx";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />

        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/lists" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

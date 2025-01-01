import { Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";

export default function App() {
    return (
        <div className="app">
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

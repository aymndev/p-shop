import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
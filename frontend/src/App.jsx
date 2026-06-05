import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import ManageUsers from "./pages/ManageUsers"
import AdminDashboard from "./pages/AdminDashboard"

export default function App() {
    const role = localStorage.getItem('role');
    return (
        <BrowserRouter >
            <Navbar />

            <Routes >
                <Route path="/" element={<Products />} />
                <Route path="/login" element={<Login />} />
                {role === 'admin' &&
                    <>
                        <Route
                            path="/admin"
                            element={<AdminDashboard />}
                        />
                        <Route
                            path="/users"
                            element={<ManageUsers />}
                        />


                    </>
                }
            </Routes>
        </BrowserRouter>
    );
}
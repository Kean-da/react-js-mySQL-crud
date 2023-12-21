import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import CreateProductPage from "../pages/createProduct/CreateProductPage";
import EditProductPage from "../pages/editProduct/EditProductPage";

const RouterRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/create" element={<CreateProductPage />}></Route>
            <Route path="/edit/:id" element={<EditProductPage />}></Route>
        </Routes>
    </div>
  )
}

export default RouterRoutes
import { FC } from "react";
import {  Routes, Route} from "react-router-dom";
import Home from "../../view/Home";
import Products from "../../view/Products";
import Users from "../../view/Users";
import ProductRegistration from "../components/ProductRegistration";
import UserRegistration from "../components/UserRegistration";

interface IRouter { }
const Router: FC<IRouter> = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usuarios" element={<Users />} />
            <Route path="/produtos" element={<Products />} />
        </Routes>
    )
}

export default Router
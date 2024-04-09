import { Route, Routes } from "react-router-dom"
import User from "../../view/Users"
import Products from "../../view/Products"
import { FC } from "react"
import Login from "../../view/Login"
import Add from "../../view/Make/Add"
import Edit from "../../view/Make/Edit"

interface IRouter {
}
const Router: FC<IRouter> = () => {

    return (
        <Routes>
            <Route path="/conectar" element={<Login />} />
            <Route path="/usuarios" element={<User />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/produtos/adicionar" element={<Add />} />
            <Route path="/produtos/editar" element={<Edit />} />
        </Routes>
    )
}

export default Router
import { Route, Routes } from "react-router-dom"
import User from "../../view/Users"
import Products from "../../view/Products"
import Add from "../../view/Add"
import { FC } from "react"
import Login from "../../view/Login"

interface IRouter {
}
const Router: FC<IRouter> = () => {

    return (
        <Routes>
            <Route path="/conectar" element={<Login />} />
            <Route path="/usuarios" element={<User />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/produtos/adicionar" element={<Add />} />
            <Route path="/produtos/editar/:id" element={<Add />} />
        </Routes>
    )
}

export default Router
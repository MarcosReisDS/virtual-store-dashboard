import { Route, Routes } from "react-router-dom"
import User from "../../view/Users"
import Products from "../../view/Products"
import Add from "../../view/Add"
import { FC } from "react"

interface IRouter {
    sidebarValue?: any;
 }
const Router: FC<IRouter> = ({ sidebarValue  }) => {

    return (
        <Routes>
            <Route path="/usuarios" element={<User routerValue={sidebarValue}/>} />
            <Route path="/produtos" element={<Products routerValue={sidebarValue}/>} />
            <Route path="/produtos/adicionar" element={<Add routerValue={sidebarValue}/>} />
            <Route path="/produtos/editar/:id" element={<Add routerValue={sidebarValue}/>} />
        </Routes>
    )
}

export default Router
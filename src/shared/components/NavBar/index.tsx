import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./style/index.scss"

interface INavBar { }
const NavBar: FC<INavBar> = () => {

    const [selected, setSelected] = useState<number>(0)
    const navigate = useNavigate()

    const changePage = (Navigate: string, Index: 0 | 1 | 2) => {
        navigate(Navigate)
        setSelected(Index)
    }

    useEffect(() => {
        const keepPage = window.location.pathname.split("/")[1]

        switch (keepPage) {
            case "/":
                setSelected(0)
                break
            case "usuarios":
                setSelected(1)
                break
            case "produtos":
                setSelected(2)
                break
        }
    }, [])

    return (
        <div className="left">
            <h1>LARANJAL</h1>
            <div className="container-choose">
                <button
                    className={`${selected === 1 ? "chosen" : "choose"}`}
                    onClick={() => changePage("/usuarios", 1)}
                >
                    USUÁRIOS
                </button>
                <button
                    className={`${selected === 2 ? "chosen" : "choose"}`}
                    onClick={() => changePage("/produtos", 2)}
                >
                    PRODUTOS
                </button>
            </div>
        </div>
    )
}

export default NavBar
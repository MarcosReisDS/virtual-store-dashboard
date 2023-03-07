import { FC } from "react"
import NavBar from "../../shared/components/NavBar"
import "./style/index.scss"

interface IHome { }
const Home: FC<IHome> = () => {
    return (
        <div className="container">
            <NavBar />

            <div className="welcome">
                <span>BEM VINDO AO DASHBOARD</span>
                <span>LARANJAL !</span>
            </div>
        </div>
    )
}

export default Home
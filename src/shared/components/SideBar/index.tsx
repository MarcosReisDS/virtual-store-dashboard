import { FC, useContext, useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx";
import { SlArrowDown } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa6";
import { BsBoxSeam } from "react-icons/bs";
import { ImSwitch } from "react-icons/im";
import "./styles.scss"
import { useNavigate } from "react-router-dom";
import Contexts, { IContext } from "../../contexts";
import { deleteCookie } from "../../utils/cookies";

interface ISideBar {
    
 }
const SideBar: FC<ISideBar> = () => {
    const navigate = useNavigate()
    const [hide, setHide] = useState<boolean>(false)
    const [openUser, setOpenUser] = useState<boolean>(false)

    const { onSidebarChange, user } = useContext(Contexts) as IContext

    const handleSidebarChange = (click: boolean) => {
        onSidebarChange(click);
        setHide(click)
      };

      const handleLogOut = () => {
        deleteCookie("token")
        navigate("/conectar")
      }

    const navi = [
        {
            name: "Usuarios", icon: FaRegUser, url: "/usuarios"
        },
        {
            name: "Produtos", icon: BsBoxSeam, url: "/produtos"
        }
    ]

    return (
        <div className={hide ? "container-side-bar hide" : "container-side-bar"}>
            {hide ?
                <>
                    <div className="hide-hamburgue" onClick={() => handleSidebarChange(false)}>
                        <RxHamburgerMenu className="hamburger" />
                    </div>
                    <div className="hide-logo">
                        <h1>as</h1>
                    </div>
                    <div className="hide-user">
                        <img src={user.profile} alt="" />
                    </div>
                    {navi.map((item, index) => (
                        <div
                            className={window.location.pathname == item.url ? "hide-itens selected" : "hide-itens"}
                            key={index}
                            onClick={() => navigate(item.url)}
                        >
                            <item.icon />
                            <div 
                            className={window.location.pathname == item.url ? "selected" : ""}
                            >
                                <p>{item.name}</p>
                            </div>
                        </div>
                    ))}
                </>
                :
                <>
                    <div className="head">
                        <h1>atual sneakers</h1>
                        <RxHamburgerMenu className="hamburger" onClick={() => handleSidebarChange(true)} />
                    </div>
                    <div className="my-user">
                        <div className="user" onClick={() => setOpenUser(openUser ? false : true)}>
                            <img src={user.profile} alt="Minha foto" />
                            <p>{user.name}</p>
                            <SlArrowDown className="arrow" />
                        </div>
                        <div className={openUser ? "drop open" : "drop"}>
                            <div onClick={handleLogOut}>
                                <ImSwitch className="switch" />
                                <p>Sair</p>
                            </div>
                        </div>
                    </div>
                    <div className="navigation">
                        {navi.map((item, index) => (
                            <ul
                                className={window.location.pathname == item.url ? "selected" : ""}
                                onClick={() => navigate(item.url)}
                                key={index}
                            >
                                <li><a>{item.name} <item.icon className="icon" /></a></li>
                            </ul>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

export default SideBar
import { FC, useContext } from "react"
import "./styles.scss"
import Contexts, { IContext } from "../../shared/contexts"

interface IUsers {
 }
const Users: FC<IUsers> = () => {
    const { valueSidebar, users } = useContext(Contexts) as IContext

    return (
        <div className={valueSidebar ? "container-users closed" : "container-users open"}>
            <div>
                <div className="table">
                    <div className="title">
                        <p>Nome</p>
                        <p>Email</p>
                    </div>
                    {users.map((user, index) => (
                        <div className="content" key={index}>
                            <img src={user.profile} alt={user.name} />
                            <div>
                                <p>{user.name}</p>
                                <p>{user.surname}</p>
                            </div>
                            <p>{user.mail}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Users
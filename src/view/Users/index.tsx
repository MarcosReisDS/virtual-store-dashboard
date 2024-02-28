import { FC, useEffect, useState } from "react"
import "./styles.scss"
import userApi from "../../shared/services/user"

interface IUsers {
    routerValue: any
 }
const Users: FC<IUsers> = ({routerValue}) => {

    const [users, setUsers] = useState<UserType[]>([])

    useEffect(() => {
        userApi.listUsers().then(data => {
            setUsers(data)
        })
    }, [users])

    return (
        <div className={routerValue ? "container-users closed" : "container-users open"}>
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
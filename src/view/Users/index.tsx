import axios from "axios";
import { FC, useEffect, useState } from "react";
import { BsFillCartCheckFill, BsFillPenFill, BsFillTrashFill } from "react-icons/bs";
import UserClass from "../../shared/classes/Client/User";
import UsersClass from "../../shared/classes/Server/Users";
import NavBar from "../../shared/components/NavBar";
import UserRegistration from "../../shared/components/UserRegistration";
import "./style/index.scss"

interface IUsers { }
const Users: FC<IUsers> = () => {

    const [allUsers, setAllUsers] = useState<UserClass[]>([])
    const [user, setUser] = useState<boolean>()
    const [userEdit, setUserEdit] = useState<number | null>(null)

    const appearUserAdd = () => {
        setUser(true)
    }
    const appearUserEdit = (userId: number) => {
        setUserEdit(userId)
    }

    const getAllUsers = async () => {
        const users = new UsersClass(null)
        setAllUsers(await users.listUsers())
    }

    const postUser = async (nameUser: string, mailUser: string, passwordUser: string) => {
        if (!nameUser) {
            console.log("insira o nome")
        }
        if (!mailUser) {
            console.log("insira o email")
        }
        if (!passwordUser) {
            console.log("insira a senha")
        } if (nameUser && mailUser && passwordUser) {
            const { data } = await axios.post(`${process.env.REACT_APP_URL_SERVER}/user/create`, { name: nameUser, mail: mailUser, password: passwordUser })
            if (data) {
                setAllUsers([...allUsers, data])
                setUser(false)
            }
        }
    }

    const putUser = async (user: any) => {
        const { data } = await axios.put(`${process.env.REACT_APP_URL_SERVER}/user/edit/${user.id}`, user)
        if (data) {
            const allUserInstance = allUsers.map((element: any) => element?.id === user.id ? user : element)
            setAllUsers(allUserInstance)
            setUserEdit(null)
        }
    }

    const deleteUser = async (id?: any) => {
        const { data } = await axios.delete(`${process.env.REACT_APP_URL_SERVER}/user/delete`, { params: { id: id } })
        setAllUsers(allUsers.filter((item: any) => item.id != data.id))
    }

    useEffect(() => {
        getAllUsers()
        deleteUser()
    }, [])

    return (
        <div className="container">
            <NavBar />


                <div className="container-table-users">
                    <div className="table-users">
                        <div className="table">
                            <span className="title-table">NOME</span>
                            <span className="title-table">EMAIL</span>
                            <span className="title-table"></span>
                        </div>
                        {allUsers?.map((user) => (

                            <div className="table">
                                <span className="content-table">{user.name}</span>
                                <span className="content-table">{user.mail}</span>
                                <span className="content-table-icons">
                                    <BsFillPenFill className="pen" onClick={() => appearUserEdit(user.id!)} />
                                    {userEdit === user.id ? <UserRegistration userId={user.id} editUser={putUser} cancelClick={() => setUserEdit(null)} /> : null}
                                    <BsFillTrashFill className="trash" onClick={() => deleteUser(user.id)} />
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="button">
                        <button className="register" onClick={appearUserAdd}>CADASTRAR</button>
                        {user ? <UserRegistration createUser={postUser} cancelClick={() => setUser(false)} /> : null}
                    </div>
                </div>

        </div>
    )
}

export default Users
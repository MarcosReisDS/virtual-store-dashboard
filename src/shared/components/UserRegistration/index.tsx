import axios from "axios"
import { FC, useEffect, useState } from "react"
import UsersClass from "../../classes/Server/Users"
import { validationMailUser, validationNameUser, validationPasswordUser } from "../../utils/validations"
import "./style/index.scss"

interface ErrorsMessage {
    name: string
    mail: string
    password: string
}

interface IUserRegistration {
    cancelClick: () => void
    createUser?: (nameUser: string, mailUser: string, passwordUser: string) => void
    editUser?: (user: any) => void
    userId?: number
}
const UserRegistration: FC<IUserRegistration> = ({ cancelClick, createUser, editUser, userId }) => {

    const [nameUser, setNameUser] = useState<string>("")
    const [mailUser, setMailUser] = useState<string>("")
    const [passwordUser, setPasswordUser] = useState<string>("")
    const [errorsMessage, setErrorsMessage] = useState<ErrorsMessage>({ mail: "", name: "", password: "" })

    const handleAction = (nameUser: string, mailUser: string, passwordUser: string) => {

        let errorsMessageInstance = errorsMessage

        if (!validationNameUser(nameUser).validated) {
            errorsMessageInstance = { ...errorsMessageInstance, name: validationNameUser(nameUser).message! }
        }
        if (!validationMailUser(mailUser).validated) {
            errorsMessageInstance = { ...errorsMessageInstance, mail: validationMailUser(mailUser).message! }
        }
        if (!validationPasswordUser(passwordUser).validated) {
            errorsMessageInstance = { ...errorsMessageInstance, password: validationPasswordUser(passwordUser).message! }
        }
        setErrorsMessage(errorsMessageInstance)

        if (validationNameUser(nameUser).validated && validationMailUser(mailUser).validated && validationPasswordUser(passwordUser).validated) {
            if (createUser) {
                createUser(nameUser!, mailUser!, passwordUser!)
            } else if (editUser && userId) {
                const userInstance = {
                    id: userId,
                    name: nameUser,
                    mail: mailUser,
                    password: passwordUser
                }
                editUser(userInstance)
            }
        }
    }

    useEffect(() => {
        const exec = async () => {

            if (userId && editUser) {
                const user = await new UsersClass(userId).user
                setNameUser(user.name)
                setMailUser(user.mail)
                setPasswordUser(user.password)
            }
        }
        
        exec()
    }, [])

    return (
        <div className="container-User-add">
            <div className="container-main-add">
                <div className="values-input-add">
                    <div className="value-add">
                        <label className="title-add">NOME</label>
                        <input type="text" required
                            className="input-add"
                            value={nameUser}
                            onChange={(e) => setNameUser(e.target.value)}
                        />
                        {!!errorsMessage.name && (
                            <span className="error-message">{errorsMessage.name}</span>
                        )}
                    </div>
                    <div className="value-add">
                        <label className="title-add">E-MAIL</label>
                        <input type="email" required
                            className="input-number-add"
                            value={mailUser}
                            onChange={(e) => setMailUser(e.target.value)}
                        />
                        {!!errorsMessage.mail && (
                            <span className="error-message">{errorsMessage.mail}</span>
                        )}
                    </div>
                    <div className="value-add">
                        <label className="title-add">SENHA</label>
                        <input type="password" required
                            className="input-number-add"
                            value={passwordUser}
                            onChange={(e) => setPasswordUser(e.target.value)}
                        />
                        {!!errorsMessage.password && (
                            <span className="error-message">{errorsMessage.password}</span>
                        )}
                    </div>
                    <div className="buttons-add">
                        <button className="button-add" onClick={() => handleAction(nameUser!, mailUser!, passwordUser!)}>{createUser ? "CRIAR" : "EDITAR"}</button>
                        <button className="button-add" onClick={cancelClick}>CANCELAR</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserRegistration
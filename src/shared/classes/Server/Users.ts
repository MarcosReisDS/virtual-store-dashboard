import axios from "axios"
import UserClass from "../Client/User"
import User from "../Client/User"
import { UserType } from "../Types/Types"

class UsersClass {
    public id: number | null
    constructor(id: number | null) {
        this.id = (id)
    }

    async listUsers(): Promise<UserClass[]> {
        return new Promise(async (resolve) => {
            const { data } = await axios.get(`${process.env.REACT_APP_URL_SERVER}/user/showall`)
            resolve(data.map((user: UserType) => new User(user)))
        })
    }

    get user(): Promise<UserClass> {
        return axios.get(`${process.env.REACT_APP_URL_SERVER}/user/show/${this.id || ""}`).then((res) => {
            return new UserClass(res.data)
        })
    }

    userByMail(mail: string): Promise<UserClass> {
        return axios.get(`${process.env.REACT_APP_URL_SERVER}/user/show`, { params: { mail } }).then((res) => {
            return new UserClass(res.data)
        })
    }
}

export default UsersClass
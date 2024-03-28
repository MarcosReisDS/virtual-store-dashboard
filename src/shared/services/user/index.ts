import Api from "../api";

class UserApi {
    private user_api = new Api("virtual")

    async listUsers(admin: number, token: any) {
        let data = await this.user_api.get(`/users?admin=${admin}`, {}, token)

        return data
    }

    async listUser(mail: string, token: any) {
        let data = await this.user_api.get(`/users/?mail=${mail}`, {}, token)

        return data
    }

    async login(mail: string, password: string) {
        return this.user_api.post("/auth", { email: mail, password })
    }
}

const userApi = new UserApi()

export default userApi
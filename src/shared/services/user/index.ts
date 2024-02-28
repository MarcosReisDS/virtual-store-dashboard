import Api from "../api";

class UserApi {
    private user_api = new Api("virtual")

    async listUsers() {
        let data = await this.user_api.get("/users", {})

        return data
    }
}

const userApi = new UserApi()

export default userApi